const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    required: true,
    enum: ["Multiple Choice", "True/False", "Short Answer", "Essay"],
  },
  tag: {
    type: String,
    trim: true,
  },
  flag: {
    type: Boolean,
    default: false,
  },
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
