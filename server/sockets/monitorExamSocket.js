// socket and io are not defined in the file. You need to pass them as arguments to the function.

const Exam = require("../models/exam.model");
const TakeExam = require("../models/take.exam.model");

const monitorExamSocket = (io, socket) => {
  socket.on("terminateExaminee", async (takeExamId) => {
    console.log(`Terminating examinee ${takeExamId}`);
    // get the exam
    const takeExam = await TakeExam.findOne({ _id: takeExamId });

    if (!takeExam) {
      console.log(`TakeExam ${takeExamId} not found`);
      return;
    }

    takeExam.status = "Terminated";
    await takeExam.save();

    io.to(takeExam.socketId).emit("examTerminated", takeExamId);
  });

  // Activity log for the user
  socket.on("userActivityLog", async (takeExamId, examId, activityLog) => {
    console.log(takeExamId, examId, activityLog, "received");
    // get the exam
    const exam = await Exam.findOne({ _id: examId });

    if (!exam) {
      console.log(`Exam ${examId} not found`);
      return;
    }

    // get the take exam
    const takeExam = await TakeExam.findOne({ _id: takeExamId });

    if (!takeExam) {
      console.log(`TakeExam ${takeExamId} not found`);
      return;
    }

    takeExam.userActivityLogs.push(activityLog);
    await takeExam.save();

    //send to invigilator about the Examinee Activity
    io.to(exam.socketId).emit("userActivityLog", takeExamId, activityLog);
  });
};

module.exports = monitorExamSocket;
