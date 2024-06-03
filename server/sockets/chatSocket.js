const Exam = require("../models/exam.model");
const TakeExam = require("../models/take.exam.model");

// initialize the chat socket
const users = {}; // This maps userId to socketId

const chatSocket = (io, socket) => {
  // Join a room
  socket.on("joinExam", async (examId, takeExamId) => {
    socket.join(examId);

    const takeExam = await TakeExam.findOne({ _id: takeExamId });

    if (!takeExam) {
      console.log(`TakeExam ${takeExamId} not found`);
      return;
    }

    takeExam.socketId = socket.id;
    await takeExam.save();

    // users[userId] = { socketId: socket.id, roomId };
    console.log(`User ${socket.id} joined room ${examId}`);
  });

  // handle invigilator socket id store
  socket.on("joinInvigilator", async (examId) => {
    socket.join(examId);
    const exam = await Exam.findOne({ _id: examId });

    if (!exam) {
      console.log(`Exam ${examId} not found`);
      return;
    }

    //TODO: Check if the user is an invigilator

    exam.socketId = socket.id;
    await exam.save();

    console.log(`Invigilator ${socket.id} joined room ${examId}`);
  });

  socket.on("announcement", (examId, message) => {
    console.log(`Announcement: ${message}`);
    // get the exam
    const exam = Exam.findOne({ _id: examId });

    if (!exam) {
      console.log(`Exam ${examId} not found`);
      return;
    }

    exam.announcement.push(message);
    exam.save();

    io.in(examId).emit("announcement", message);
  });

  // Handle sending a chat message
  socket.on("sendMessage", async (examId, isInvigilator, message) => {
    let takeExam = null;

    if (!isInvigilator) {
      // get the socket id from the exam
      const exam = await Exam.findOne({ _id: examId });

      if (!exam) {
        console.log(`Exam ${examId} not found`);
        return;
      }

      // update the take exam chat messages
      takeExam = await TakeExam.findOne({
        exam: examId,
        user: message.reciever,
        active: true,
      });

      if (!takeExam) {
        console.log(`TakeExam not found`);
        return;
      }

      takeExam.chatMessages.push(message);
      await takeExam.save();

      const invigilatorSocketId = exam.socketId;

      // send the message to the invigilator
      io.to(invigilatorSocketId).emit("receiveMessage", message);
    } else {
      // get the socket id from the take exam
      const takeExam = await TakeExam.findOne({
        user: message.reciever,
        exam: examId,
        active: true,
      });

      if (!takeExam) {
        console.log(`TakeExam not found`);
        return;
      }

      takeExam.chatMessages.push(message);
      await takeExam.save();

      const userSocketId = takeExam.socketId;

      // send the message to the user
      io.to(userSocketId).emit("receiveMessage", message);
    }
  });
};

module.exports = chatSocket;
