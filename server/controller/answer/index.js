const { createUserAnswer } = require("./createUserAnswer");
const { deleteUserAnswer } = require("./deleteUserAnswer");
const { getOneUserAnswer } = require("./getUserAnswer");
const { updateUser } = require("./updateUser");
const {evaluateUserAnswer} = require("./evaluateUserAnswer")

module.exports = {
    createUserAnswer,
    deleteUserAnswer,
    getOneUserAnswer,
    updateUserAnswer,
    evaluateUserAnswer
}