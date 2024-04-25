const { createQuestion } = require("./createQuestion");
const { deleteQuestion } = require("./deleteQuestion");
const { getAllQuestion, getOneQuestion } = require("./getQuestion");
const { updateQuestion } = require("./updateQuestion");

module.exports = {
    createQuestion,
    deleteQuestion,
    getAllQuestion,
    getOneQuestion,
    updateQuestion
}