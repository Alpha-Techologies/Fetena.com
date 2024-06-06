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
    type: String,
    enum: ["low", "medium", "high"],
  },

  timestamp: {
    type: Date,
    default: Date.now(),
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
    type: Date,
    default: Date.now(),
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
