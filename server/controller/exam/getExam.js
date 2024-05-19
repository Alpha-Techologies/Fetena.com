const Exam = require("../../models/exam.model");
const User = require("../../models/user.model");
const APIFeatures = require("../../utils/apiFeatures");
const catchAsync = require("../../utils/catchAsync");
const factory = require("./../handlerFactory");

exports.getOneExam = factory.getOne(Exam);
exports.getAllExam = factory.getAll(Exam, "addOrganization");
exports.getMyExam = factory.getAll(Exam, "addExamCreater");
exports.getPublicExam = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  let query = new APIFeatures(
    Exam.find({ organization: { $in: user.organizationFollowed } }),
    req.query
  )
    .filter()
    .field()
    .sort()
    .paginate()
    .populate();

  const doc = await query.query;

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc,
    },
  });
});
