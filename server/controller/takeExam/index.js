const { faceaiDetection } = require("./faceaiDetection.js");
const startExam = require("./startExam");
const {
  updateTakeExam,
  getOneExamTaker,
  getAllExamTaker,
} = require("./takeExam.js");
const { getTakenExam } = require("./takenExams.js");

module.exports = {
  startExam,
  updateTakeExam,
  getOneExamTaker,
  getAllExamTaker,
  faceaiDetection,
  getTakenExam,
};
