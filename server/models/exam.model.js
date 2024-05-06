const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 minute']
  },
  examKey: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  privateAnswer: {
    type: Boolean,
    default: false
  },
  privateScore: {
    type: Boolean,
    default: false
  },
  toolsPermitted: [{
    type: String,
    trim: true
  }],
  invigilatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  reqField:[{
    type: String,
    required: true,
  }],
  securityMode:{
    type: String,
    required: true,
    default: "low",
    enum: {
      values: ["high", "medium", "low"],
      message: "security mode must be either high, medium, or low",
    },
  },
  access:{
    type: String,
    required: true,
    default: "closed",
    enum: {
      values: ["open", "closed"],
      message: "access must be either open, closed",
    },
  },
  startDate:{
    type: Date,
    required:false
  }

});

const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;
