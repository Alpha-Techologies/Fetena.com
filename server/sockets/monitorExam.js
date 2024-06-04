// socket and io are not defined in the file. You need to pass them as arguments to the function.

const TakeExam = require("../models/take.exam.model");

const monitorExamSocket = (socket, io) => {
  socket.on("terminateExaminee", async (examId, takeExamId) => {
    console.log(`Terminating examinee ${takeExamId}`);
    // get the exam
    const takeExam = await TakeExam.findOne({ _id: takeExamId, exam: examId });

    if (!takeExam) {
      console.log(`TakeExam ${takeExamId} not found`);
      return;
    }

    takeExam.status = "Terminated";
    await takeExam.save();

    io.to(takeExam.socketId).emit("examTerminated");
  });
};
