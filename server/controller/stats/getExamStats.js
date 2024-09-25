const Exam = require("../../models/exam.model");
const Organization = require("../../models/organization.model");
const APIError = require("../../utils/apiError");
// const OrganizationExaminer = require("../../models/organization.examiner.model");
// const OrganizationFollower = require("../../models/organization.follower.model");

const catchAsync = require("../../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");

const countTotalExams = async (organizationId) => {
  const totalExams = await Exam.countDocuments({
    organization: new mongoose.Types.ObjectId(organizationId),
  });
  console.log(`Total Exams: ${totalExams}`);

  return totalExams;
};

const countExamsBySecurityLevel = async (organizationId) => {
  const examsBySecurityLevel = await Exam.aggregate([
    { $match: { organization: new mongoose.Types.ObjectId(organizationId) } },
    { $group: { _id: "$securityLevel", count: { $sum: 1 } } },
  ]);

  console.log("Exams by Security Level:", examsBySecurityLevel);

  // [
  //   { "_id": "high", "count": 5 },
  //   { "_id": "medium", "count": 12 },
  //   { "_id": "low", "count": 8 }
  // ]

  return examsBySecurityLevel;
};

const countActiveExams = async (organizationId) => {
  const activeExams = await Exam.countDocuments({
    active: true,
    organization: new mongoose.Types.ObjectId(organizationId),
  });
  console.log(`Active Exams: ${activeExams}`);
  return activeExams;
};

const countExamsByType = async (organizationId) => {
  const examsByType = await Exam.aggregate([
    { $match: { organization: new mongoose.Types.ObjectId(organizationId) } },
    { $group: { _id: "$examType", count: { $sum: 1 } } },
  ]);

  console.log("Exams by Type:", examsByType);

  // [
  //   { "_id": "final", "count": 10 },
  //   { "_id": "midterm", "count": 8 },
  //   { "_id": "quiz", "count": 15 }
  // ]

  return examsByType;
};

const countExamsWithCertificates = async (organizationId) => {
  const examsWithCertificates = await Exam.countDocuments({
    organization: new mongoose.Types.ObjectId(organizationId),
    hasCertificate: true,
  });
  console.log(`Exams with Certificates: ${examsWithCertificates}`);

  return examsWithCertificates;
};

const countExamsByVisibility = async (organizationId) => {
  const examsByVisibility = await Exam.aggregate([
    { $match: { organization: new mongoose.Types.ObjectId(organizationId) } },
    { $group: { _id: "$visibility", count: { $sum: 1 } } },
  ]);

  console.log("Exams by Visibility:", examsByVisibility);
};

const findExamsByUser = async (userId, organizationId) => {
  const exams = await Exam.find({
    organization: new mongoose.Types.ObjectId(organizationId),
    createdBy: mongoose.Types.ObjectId(userId),
  });
  console.log(`Exams created by User ${userId}:`, exams);
};

exports.getExamStats = catchAsync(async (req, res, next) => {
  const organizationId = req.params.id;

  const organization = await Organization.findOne({ _id: organizationId });

  if (!organization) {
    next(new APIError("Organization not found", StatusCodes.BAD_REQUEST));
  }

  // countVerifiedOrganizations()

  const totalExams = countTotalExams(organization.id);
  const examsBySecurity = countExamsBySecurityLevel(organizationId);
  const activeExams = countActiveExams(organizationId);

  const examsByType = await countExamsByType(organizationId);
  const examsWithCert = await countExamsWithCertificates(organizationId);
  const examsByVisibility = await countExamsByVisibility(organizationId);
  // const examsByCreator = await findExamsByUser(req.user._id,organizationId)

  res.status(StatusCodes.ACCEPTED).send({
    totalExams,
    examsBySecurity,
    activeExams,
    examsByType,
    examsWithCert,
    examsByVisibility,
    // examsByCreator
  });
});
