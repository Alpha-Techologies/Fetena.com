const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: [true, 'Exam is required'],
    },
    issueDate: {
      type: Date,
      default: Date.now,
      required: [true, 'Issue date is required'],
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
