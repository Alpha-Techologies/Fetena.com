const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answerText: String,
});

const UserAnswerSchema = new mongoose.Schema({
  score: {
    type: Number,
    default: 0,
  },
  questionAnswers: [AnswerSchema], // Array of question and answer objects
});

const UserAnswer = mongoose.model("UserAnswer", UserAnswerSchema);

module.exports = UserAnswer;
