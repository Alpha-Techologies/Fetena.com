// const userAnswer = require("../../models/user.answer.model");
const catchAsync = require("./../../utils/catchAsync");
const TogetherManager = require("../../AI");
const APIError = require("../../utils/apiError");
const { json } = require("express");

const Question = require("../../models/question.model");
const UserAnswer = require("../../models/user.answer.model");
const Exam = require("../../models/exam.model");
const logger = require("../../utils/logger");


exports.evaluateUserAnswer = catchAsync(async (req, res, next) => {
  console.log("evaluated");

  const userAnswer = await UserAnswer.findById(req.params.id);

  if (!userAnswer) {
    return next(new APIError("Users answers not not found", 404));
  }

  // console.log(userAnswer)

  const exam = await Exam.findById(userAnswer.examId)
  .populate('questions');

  if (!exam) {
    return next(new APIError("Exam not found", 404));
  }

  const questions = exam.questions;

  let totalScore = 0;
  // for 
  // const apiKey = process.env.TOGETHER_API_KEY;
  // const togetherManager = new TogetherManager(apiKey, _, true);

  userAnswer.questionAnswers.forEach(userAnswer => {
    let question = null;
    for (let i = 0; i < questions.length; i++) {
        if (questions[i]._id.equals(userAnswer.questionId._id)) {
            question = questions[i];
            break;
        }
    }
    if (question) {
        // Handle different question types separately
        if (question.questionType === 'True/False' || question.questionType === 'choose') {
            // Perform case-insensitive string comparison for true/false and choice questions
            const userAnswerText = userAnswer.answerText.toLowerCase().trim();
            const correctAnswerText = question.correctAnswer.toLowerCase().trim();
            if (userAnswerText === correctAnswerText) {
                totalScore += question.points; // Increment score if answers match
            }
        } else {
            // Handle other question types (e.g., short answer, essay) here
            // Add your logic for evaluating those types of questions
            // For simplicity, we'll just assume all other types are manually graded
            // and give full points if the answer is not empty
            if (userAnswer.answerText.trim() !== '') {
                totalScore += question.points; // Give full points if answer is not empty
            }
        }
    }
});

userAnswer.score = totalScore
await userAnswer.save()

  res.status(200).send({ 'Total Score:' : totalScore });

  // const prompt =
  //   "I am giving you an a question in a json file try to understand and and create an appropriate tags for this question and in your return make it a json file that has an object with a key tag and an array of string that are going to be the tags and make the tags short and concise and answer me with a json format string in which i can take your output and use the json.parse" +
  //   JSON.stringify({
  //     question: question.questionText,
  //     options: question.questionChoice,
  //     type: question.questionType,
  //   });

  // const result = await togetherManager.performInference(prompt);

  // console.log(result);
  // const data = JSON.parse(result);

  // // const data = parse(result)

  // res.status(200).send({ message: result, data });
});
