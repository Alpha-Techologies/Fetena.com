const Exam = require("../../models/exam.model");
const Organization = require("../../models/organization.model");
const TakeExam = require("../../models/take.exam.model");
const APIError = require("../../utils/apiError");
// const OrganizationExaminer = require("../../models/organization.examiner.model");
// const OrganizationFollower = require("../../models/organization.follower.model");

const catchAsync = require("../../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");

// const countTotalExams = async (organizationId) => {
//   const totalExams = await Exam.countDocuments(
//     { organization: new mongoose.Types.ObjectId(organizationId) }
//   );
//   console.log(`Total Exams: ${totalExams}`);

//   return totalExams
// };

// const countExamsByType = async (organizationId) => {
//   const examsByType = await Exam.aggregate([
//     { $match :{ organization: new mongoose.Types.ObjectId(organizationId) }},
//     { $group: { _id: "$examType", count: { $sum: 1 } } }
//   ]);

//   console.log('Exams by Type:', examsByType);

//   // [
//   //   { "_id": "final", "count": 10 },
//   //   { "_id": "midterm", "count": 8 },
//   //   { "_id": "quiz", "count": 15 }
//   // ]

//   return examsByType
// };

// const countExamsBySecurityLevel = async (organizationId) => {
//   const examsBySecurityLevel = await Exam.aggregate([
//     { $match :{ organization: new mongoose.Types.ObjectId(organizationId) }},
//     { $group: { _id: "$securityLevel", count: { $sum: 1 } } }
//   ]);

//   console.log('Exams by Security Level:', examsBySecurityLevel);

//   // [
//   //   { "_id": "high", "count": 5 },
//   //   { "_id": "medium", "count": 12 },
//   //   { "_id": "low", "count": 8 }
//   // ]
  
//   return examsBySecurityLevel;
// };

// const countExamsByStartDate = async (organizationId) => {
//   const examsByStartDate = await Exam.aggregate([
//     { $match :{ organization: new mongoose.Types.ObjectId(organizationId) }},
//     { $group: { _id: "$startDate", count: { $sum: 1 } } }
//   ]);

//   console.log('Exams by start Date:', examsByStartDate);

//   // [
//   //   { "_id": "high", "count": 5 },
//   //   { "_id": "medium", "count": 12 },
//   //   { "_id": "low", "count": 8 }
//   // ]
  
//   return examsByStartDate;
// };

// const countActiveExams = async (organizationId) => {
//   const activeExams = await Exam.countDocuments({
//      active: true,
//      organization: new mongoose.Types.ObjectId(organizationId)
//     });
//   console.log(`Active Exams: ${activeExams}`);
// };


// const countExamsWithCertificates = async (organizationId) => {
//   const examsWithCertificates = await Exam.countDocuments({
//     organization: new mongoose.Types.ObjectId(organizationId),
//     hasCertificate: true });
//   console.log(`Exams with Certificates: ${examsWithCertificates}`);

//   return examsWithCertificates;
// };


// const countExamsByVisibility = async (organizationId) => {
//   const examsByVisibility = await Exam.aggregate([
//     { $match :{ organization: new mongoose.Types.ObjectId(organizationId) }},
//     { $group: { _id: "$visibility", count: { $sum: 1 } } }
//   ]);

//   console.log('Exams by Visibility:', examsByVisibility);

//   // [
//   //   { "_id": "public", "count": 20 },
//   //   { "_id": "private", "count": 10 },
//   //   { "_id": "restricted", "count": 5 }
//   // ]

//   return examsByVisibility
  
// };


const conutExamsByTaken = async (req) =>{
  const examsTaken = await TakeExam.countDocuments({
    user:req.user.id,
  })

  return examsTaken;
}

const countExamsByCertification = async (req) =>{
  const examsTaken = await TakeExam.countDocuments({
    user:req.user.id,
    hasCertificate: false
  })

  return examsTaken;
}


const countExamsByDate = async (req) =>{
  const examsTaken = await TakeExam.aggregate([
    { $match :{ organization: new mongoose.Types.ObjectId(req.user.id) }},
    { $group: { _id: "$startDate", count: { $sum: 1 } } }
  ]);

  return examsTaken;
}

exports.getUserStats = catchAsync(async (req, res, next) => {
   
    // const organizationId = req.params.id;

    // const organization = await Organization.findOne({ _id: organizationId });

    // if (!organization) {
    //     next(new APIError("Organization not found", StatusCodes.BAD_REQUEST));
    // }

    const totalExams = await conutExamsByTaken(req)
    const examsByCertificate = await countExamsByCertification(req)
    const examsByDate = await countExamsByDate(req)
    
    res.status(StatusCodes.ACCEPTED).send({
      totalExams,
      examsByCertificate,
      examsByDate
    })
    
})