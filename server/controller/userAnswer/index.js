const { createUserAnswer } = require("./createUserAnswer");
const { deleteUserAnswer } = require("./deleteUserAnswer");
const { getOneUserAnswer } = require("./getOneUserAnswer");
const { updateUserAnswer } = require("./updateUserAnswer");
const {evaluateUserAnswer} = require("./evaluateUserAnswer")

module.exports = {
    createUserAnswer,
    deleteUserAnswer,
    getOneUserAnswer,
    updateUserAnswer,
    evaluateUserAnswer
}