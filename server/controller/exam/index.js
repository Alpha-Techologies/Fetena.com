const { createExam } = require("./createExam");
const { deleteExam } = require("./deleteExam");
const { getAllExam, getOneExam } = require("./getExam");
const { updateExam } = require("./updateExam");

module.exports = {
    createExam,
    deleteExam,
    getAllExam,
    getOneExam,
    updateExam
}