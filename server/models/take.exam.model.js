const mongoose = require("mongoose");
// const moment = require("moment");

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
  action: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
  actionType: {
    type: String,
    required: true,
    enum: ["info", "warning"]
  },
  // actionType tells the severity of the action taken by the examinee
  // actionType: 'low' -> low severity
  // actionType: 'medium' -> medium severity
  // actionType: 'high' -> high severity

  timestamp: {
    type: Date,
    default: Date.now(),
  },
  imageUrl: {
    type: String,
  },

});

const takeExamSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: [
        "pending",
        "inprogress",
        "submitted",
        "terminated",
        "interrupted",
        "completed",
      ],
      message:
        "examStatus can be either pending, inprogress, submitted, terminated, interrupted or completed",
    },
  },
  startTime: {
    type: String,
    // default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  endTime: {
    type: Date,
  },
  userAnswers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAnswer",
  },

  chatMessages: [chatMessageSchema],
  userActivityLogs: [userActivityLogSchema],
  socketId: {
    type: String,
  },
  examEndTime: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

takeExamSchema.methods.sendChat = async function (chatMessage) {
  // if already followed return
  // if (this.organizationsFollowed.includes(id)) return this;

  this.chatMessages.push(chatMessage);

  // const organizationFollowed = await OrganizationFollower.findOne({
  //   organization: id,
  // });

  // if (organizationFollowed) {
  //   organizationFollowed.follower.push(this._id);
  //   await organizationFollowed.save();
  // } else {
  //   const newOrganizationFollower = new OrganizationFollower({
  //     organization: id,
  //     follower: [this._id],
  //   });
  //   await newOrganizationFollower.save();
  // }

  this.save();
  return this;
};

const TakeExam = mongoose.model("TakeExam", takeExamSchema);

module.exports = TakeExam;
