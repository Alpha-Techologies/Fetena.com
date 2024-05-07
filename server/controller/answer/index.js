const { createAnswer } = require("./createAnswer");
const { deleteAnswer } = require("./deleteAnswer");
const { getAllAnswer, getOneAnswer } = require("./getAnswer");
const { updateAnswer } = require("./updateAnswer");
const {evaluateAnswer} = require("./evaluateAnswer")

module.exports = {
    createAnswer,
    deleteAnswer,
    getAllAnswer,
    getOneAnswer,
    updateAnswer,
    evaluateAnswer
}