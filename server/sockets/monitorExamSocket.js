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

    takeExam.status = "terminated";
    await takeExam.save();

    io.to(takeExam.socketId).emit(
      "examTerminated",
      takeExamId,
      "Exam terminated by invigilator"
    );
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

  // if Exam get closed Terminate all the Examinee that are currently taking the exam.
  socket.on("closeExam", async (examId) => {
    console.log(`Terminating all examinee for exam ${examId}`);
    // get the exam
    const exam = await Exam.findOne({ _id: examId });

    if (!exam) {
      console.log(`Exam ${examId} not found`);
      return;
    }

    // get all the take exam that are currently taking the exam
    const takeExams = await TakeExam.find({ examId: examId });

    console.log(takeExams, "takeExams");

    // iterate over the take exam and create emit a socket event to terminate the examinee
    takeExams.forEach((takeExam) => {
      if (takeExam.status === "inprogress") {
        takeExam.status = "terminated";
        takeExam.save();
        io.to(takeExam.socketId).emit(
          "examTerminated",
          takeExam._id,
          "Exam closed by invigilator"
        );
      }
    });
  });
};

module.exports = monitorExamSocket;
