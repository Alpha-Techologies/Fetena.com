const { StatusCodes } = require("http-status-codes");
const Certificate = require("../../models/certificate.model");
const Exam = require("../../models/exam.model");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const factory = require("./../handlerFactory");
const Organization = require("../../models/organization.model");

exports.createCertificate = factory.createOne(Certificate);

exports.addOrganizationForCertificate = catchAsync(async (req, res, next) => {
  // Add organization to req.body
  const examId = req.body.exam;

  const exam = await Exam.findById(examId);

  if (!exam) {
    return next(new APIError("Exam not found", StatusCodes.BAD_REQUEST));
  }

  await Certificate.deleteMany({ exam: examId, user: req.body.user });

  const org = await Organization.findById(exam.organization);
  if (!org) {
    return next(
      new APIError("Organization not found", StatusCodes.BAD_REQUEST)
    );
  }

  req.body.organizationName = org.name;
  req.organization = org._id;
  next();
});
