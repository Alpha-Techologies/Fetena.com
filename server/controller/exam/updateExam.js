const { StatusCodes } = require("http-status-codes");
const Exam = require("../../models/exam.model");
const catchAsync = require("../../utils/catchAsync");
const factory = require("./../handlerFactory");
const APIError = require("../../utils/apiError");

exports.updateExam = factory.updateOne(Exam);

exports.updateExamResource = catchAsync(async (req, res, next) => {
  if (!req.files) {
    return next(new APIError("There is no file", StatusCodes.BAD_REQUEST));
  }

  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    return next(new APIError("Exam does not exist", StatusCodes.BAD_REQUEST));
  }

  if (req.files.material) {
    const examMaterial = req.files.material;
    if (!examMaterial.mimetype.startsWith("application/pdf")) {
      return next(
        new APIError("Please upload a Proper PDF", StatusCodes.BAD_REQUEST)
      );
    }

    const MaterialLink = await fileUpload({
      file: examMaterial,
      name: `examMaterial_` + req.params.id,
      filePath: "examMaterials",
      maxSize: 4 * 1024 * 1024,
    });

    if (MaterialLink instanceof Error) {
      return next(MaterialLink);
    }

    exam.material = MaterialLink;
  }
  if (req.files.examFile) {
    const examFile = req.files.examFile;
    if (!examFile.mimetype.startsWith("application/pdf")) {
      return next(
        new APIError("Please upload a Proper PDF", StatusCodes.BAD_REQUEST)
      );
    }

    const examFileLink = await fileUpload({
      file: examFile,
      name: `examFile_` + req.params.id,
      filePath: "examFiles",
      maxSize: 4 * 1024 * 1024,
    });

    if (examFileLink instanceof Error) {
      return next(examFileLink);
    }

    exam.examFile = examFileLink;
  }

  await exam.save();

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      exam,
    },
  });
});
