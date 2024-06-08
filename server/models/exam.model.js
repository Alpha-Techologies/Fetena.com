const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema(
  {
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
    announcement: [
      {
        type: String,
      },
      {
        type: Date,
        default: Date.now(),
      },
    ],
    examType: {
      type: String,
      enum: ["pdfUpload", "online", "worksheet"],
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
    socketId: {
      type: String,
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

    active: {
      type: Boolean,
      default: true,
    },
    points: {
      type: Number,
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "public",
    },
    hasCertificate:{
      type:Boolean,
      default:false 
    }
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
