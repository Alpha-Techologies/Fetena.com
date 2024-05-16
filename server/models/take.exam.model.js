const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const userActivityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  // actionType tells the severity of the action taken by the examinee
  // actionType: 'low' -> low severity
  // actionType: 'medium' -> medium severity
  // actionType: 'high' -> high severity
  actionType: {
    type: Enum,
    values: ["low", "medium", "high"],
  },

  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const takeExamSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["pending", "inprogress", "submitted", "terminated", "interrupted"],
      message: "examStatus can be either pending, inprogress or completed",
    },
  },
  startTime: {
    type: Date,
    default: Date.now(),
  },
  endTime: {
    type: Date,
  },
  userAnswers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAnswer",
    },
  ],
  chatMessages: [chatMessageSchema],
  userActivityLogs: [userActivityLogSchema],
});


const TakeExam = mongoose.model("TakeExam", takeExamSchema);

