const { addUserToBody, createNotification } = require("./createNotification");
const {getNotification, addOptionToBody} = require("./getNotification");
const {updateNotification, authorizeNotificationUpdate} = require("./updateNotification");

module.exports = {
  getNotification,
  updateNotification,
  addUserToBody,
  createNotification,
  addOptionToBody,
  authorizeNotificationUpdate
};
