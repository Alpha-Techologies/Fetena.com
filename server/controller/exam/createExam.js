const { StatusCodes } = require("http-status-codes");
const Exam = require("../../models/exam.model");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const { fileUpload } = require("../profile/fileUpload");
const generateRandomKey = require("../../utils/generateRandomKey");
const { logActivity } = require("../../utils/logActivity");


exports.createExam = catchAsync(async (req, res, next) => {
  // form data will be send in req, holding in the req.file the material that is a PDF file
  // req.body.data will hold the data of the exam

  //   if (!req.files.material) {
  //     return next(new APIError("There is no file", StatusCodes.BAD_REQUEST));
  //   }


  if (!req.body.data) {
    return next(new APIError("There is no user data", StatusCodes.BAD_REQUEST));
  }

  const examData = JSON.parse(req.body.data);

  // create the exam
  const exam = new Exam(examData);
  exam.createdBy = exam.createdBy || req.user.id;

  exam.invigilatorID = exam.invigilatorID || req.user.id;


  // generate an exam key that will store a combination of characters and numbers and special characters that has a length of 6
  const examKey = generateRandomKey(6);
  exam.examKey = examKey;

  if (req.files)
    if (req.files.material) {
      const examMaterial = req.files.material;
      // check if the examMaterial is a PDF
      if (!examMaterial.mimetype.startsWith("application/pdf")) {
        return next(
          new APIError("Please upload a Proper PDF", StatusCodes.BAD_REQUEST)
        );
      }

      const MaterialLink = await fileUpload({
        file: examMaterial,
        name: `examMaterial_` + exam._id,
        filePath: "examMaterials",
        maxSize: 4 * 1024 * 1024,
      });

      // check for error on the file
      if (MaterialLink instanceof Error) {
        return next(MaterialLink);
      }

      exam.material = MaterialLink;
    }

  if (req.files)
    if (req.files.examFile) {
      const examFile = req.files.examFile;
      // check if the examMaterial is a PDF
      if (!examFile.mimetype.startsWith("application/pdf")) {
        return next(
          new APIError("Please upload a Proper PDF", StatusCodes.BAD_REQUEST)
        );
      }

      const examFileLink = await fileUpload({
        file: examFile,
        name: `examFile_` + exam._id,
        filePath: "examFiles",
        maxSize: 4 * 1024 * 1024,
      });

      // check for error on the file
      if (examFileLink instanceof Error) {
        return next(examFileLink);
      }

      exam.examFile = examFileLink;
    }

  await exam.save();

  await logActivity(req,0,{name:'exam',id:exam.id} )

  res.status(201).json({
    status: "success",
    data: {
      exam,
    },
  });
});
