const { StatusCodes } = require("http-status-codes");
const Exam = require("../../models/exam.model");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const factory = require("./../handlerFactory");
const { fileUpload } = require("../profile/fileUpload");

exports.createExam = catchAsync(async (req, res, next) => {
  // form data will be send in req, holding in the req.file the material that is a PDF file
  // req.body.data will hold the data of the exam

  if (!req.files.material) {
    return next(new APIError("There is no file", StatusCodes.BAD_REQUEST));
  }

  if (!req.body.data) {
    return next(new APIError("There is no user data", StatusCodes.BAD_REQUEST));
  }

  const examMaterial = req.files.material;
  // check if the examMaterial is a PDF
  if (!examMaterial.mimetype.startsWith("application/pdf")) {
    return next(
      new APIError("Please upload a Proper PDF", StatusCodes.BAD_REQUEST)
    );
  }

  const examData = JSON.parse(req.body.data);

  // create the exam
  const exam = new Exam(examData);

  const MaterialLink = await fileUpload({
    file: examMaterial,
    name: `examMaterial_` + examData.name,
    filePath: "examMaterials",
    maxSize: 4 * 1024 * 1024,
  });

  // check for error on the file
  if (MaterialLink instanceof Error) {
    return next(MaterialLink);
  }

  exam.material = MaterialLink;
  exam.createdBy = exam.createdBy || req.user.id;
  exam.invigilatorID = exam.invigilatorID || req.user.id;

  res.status(201).json({
    status: "success",
    data: {
      exam,
    },
  });
});
