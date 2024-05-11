const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionChoice: [
    {
      type: String,
      required: true,
    },
  ],
  answerText: {
    type: String,
  },
  questionType: {
    type: String,
    required: true,
    enum: [
      "Multiple Choice",
      "True/False",
      "Short Answer",
      "Essay",
      "Matching",
    ],
  },
  tag: [
    {
      type: String,
      trim: true,
    },
  ],
  flag: {
    type: Boolean,
    default: false,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
