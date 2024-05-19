const { createExam } = require("./createExam");
const { deleteExam } = require("./deleteExam");
const { getAllExam, getOneExam, getMyExam, getPublicExam } = require("./getExam");
const { updateExam, updateExamResource } = require("./updateExam");

module.exports = {
  createExam,
  deleteExam,
  getAllExam,
  getOneExam,
  updateExam,
  getMyExam,
  updateExamResource,
  getPublicExam
};
