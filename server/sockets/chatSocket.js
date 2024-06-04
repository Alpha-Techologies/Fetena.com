const Exam = require("../models/exam.model");
const TakeExam = require("../models/take.exam.model");

// initialize the chat socket
const users = {}; // This maps userId to socketId

const chatSocket = (io, socket) => {
  // Join a room
  socket.on("joinExam", async (examId, takeExamId) => {
    console.log(takeExamId, "the two ids");
    console.log(examId, "examId");
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

  socket.on("announcement", async (examId, message) => {
    console.log(`Announcement: ${message}`);
    // get the exam
    const exam = await Exam.findOne({ _id: examId });

    if (!exam) {
      console.log(`Exam ${examId} not found`);
      return;
    }

    // if (!exam.announcement) {
    //   exam.announcement = [];
    // }
    // console.log(exam);
    exam.announcement.push(message);
    await exam.save();

    io.in(examId).emit("announcement", message);
  });

  // Handle sending a chat message
  socket.on("sendMessage", async (examId, isInvigilator, message) => {
    let takeExam = null;
    console.log(examId, isInvigilator, message);

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
        user: message.sender,
        active: true,
      });

      if (!takeExam) {
        console.log(`TakeExam not found`);
        return;
      }

      takeExam.chatMessages.push(message);
      await takeExam.save();

      const invigilatorSocketId = exam.socketId;
      console.log("message sent successfully");

      // send the message to the invigilator
      io.to(invigilatorSocketId).emit("receiveMessage", message);
    } else {
      // get the socket id from the take exam
      const takeExam = await TakeExam.findOne({
        user: message.receiver,
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

      console.log(socket.rooms);

      // send the message to the user
      console.log("message sent to examinee", userSocketId);
      io.to(userSocketId).emit("receiveMessage", message);
    }
  });
};

module.exports = chatSocket;
