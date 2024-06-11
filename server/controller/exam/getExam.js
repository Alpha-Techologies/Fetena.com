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
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;

  const opt = {
    organization: { $in: user.organizationsFollowed },
    visibility: "public",
    active: true,
  };

  let count = new APIFeatures(Exam.find(opt), req.query).filter().count();
  let total = await count.query;

  let query = new APIFeatures(Exam.find(opt), req.query)
    .filter()
    .field()
    .sort()
    .paginate()
    .populate();

  const doc = await query.query;

  if (!doc) {
    return next(
      new APIError(`No document found`, 404)
    );
  }

  res.status(200).json({
    status: "succcess",
    data: {
      data: doc,
      results: doc.length,
      paginationData: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        showingFrom: limit * (page - 1) + 1,
        showingUntil: limit * page > total ? total : limit * page,
      },
    },
  });
});
