const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    min: [1, "Duration must be at least 1 minute"],
  },
  examKey: {
    type: String,
    trim: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  securityLevel: {
    type: String,
    enum: ["low", "high"],
    required: true,
  },
  examType: {
    type: String,
    enum: ["pdfUpload", "createOnline", "worksheet"],
    required: true,
  },
  privateAnswer: {
    type: Boolean,
    default: false,
  },
  privateScore: {
    type: Boolean,
    default: false,
  },
  toolsPermitted: [
    {
      type: String,
      trim: true,
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  invigilatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  access: {
    type: String,
    enum: ["closed", "open"],
    default: "closed",
  },
  material: {
    type: String,
  },
  examFile: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  requiredField: [
    {
      type: String,
    },
  ],
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
});

const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
