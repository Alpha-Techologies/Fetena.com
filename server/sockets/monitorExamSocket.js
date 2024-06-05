// socket and io are not defined in the file. You need to pass them as arguments to the function.

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

    io.to(takeExam.socketId).emit("examTerminated", takeExamId);
  });
};

module.exports = monitorExamSocket;
