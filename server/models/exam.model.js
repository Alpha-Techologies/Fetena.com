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
  }]
});

const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;
