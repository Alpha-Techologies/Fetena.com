// const userAnswer = require("../../models/user.userAnswer.questionAnswers[i].model");
const catchAsync = require("./../../utils/catchAsync");
const TogetherManager = require("../../AI");
const APIError = require("../../utils/apiError");
const { json } = require("express");
const { shortAnswer, essay } = require("../../prompts");

const UserAnswer = require("../../models/user.answer.model");
const Exam = require("../../models/exam.model");

exports.evaluateUserAnswer = catchAsync(async (req, res, next) => {

  console.log("evaluated");

  const userAnswer = await UserAnswer.findById(req.params.id);

  if (!userAnswer) {
    return next(new APIError("Users answers not found", 404));
  }

  const exam = await Exam.findById(userAnswer.examId)
  .populate('questions');

  if (!exam) {
    return next(new APIError("Exam not found", 404));
  }

  let questions = exam.questions;

  let totalScore = 0;
  const apiKey = process.env.TOGETHER_API_KEY;
  const togetherManager = new TogetherManager(apiKey, _, true);

  for (let i = 0; i < userAnswer.questionAnswers.length; i++) {

    let question = null;
    for (let j = 0; j < questions.length; j++) {
        if (questions[j]._id.equals(userAnswer.questionAnswers[i].questionId._id)) {
            question = questions[j];
            break;
        }
    }
    if (question) {
      // Handle different question types separately 
      const answerText = userAnswer.questionAnswers[i].answerText.toLowerCase().trim();
      const correctAnswerText = question.correctAnswer.toLowerCase().trim();

        if (question.questionType === 'True/False' || question.questionType === 'choose' || question.questionType === 'matching') {
            // Perform case-insensitive string comparison for true/false and choice questions
            // here
            if (answerText === correctAnswerText) {
                userAnswer.questionAnswers[i].point = question.points 
                totalScore += question.points; // Increment score if answers match
            }
        } else {
            // Handle other question types (e.g., short answer, essay)
            if (userAnswer.questionAnswers[i].answerText.trim() !== '') {
              // const prompt = shortAnswer(question.questionText, question.correctAnswer, question.points, question.correctAnswer, userAnswer.questionAnswers[i].answerText.trim())
              
              // const result = await togetherManager.performInference(prompt);
              // console.log('result',result.trim());
              // userAnswer.questionAnswers[i].reason = result.replaceAll('\n','')
              userAnswer.questionAnswers[i].point = question.points;
              totalScore += 0; // Give full points if userAnswer.questionAnswers[i] is not empty
                totalScore += question.points; // Give full points if userAnswer.questionAnswers[i] is not empty
            }
          }
        }
      } 
  userAnswer.score = totalScore
  await userAnswer.save()

  var response = {}

  if(exam.privateScore){
    // totalScore = 0
  }

  if(exam.privateAnswer){
    // userAnswer.questionAnswers = "undefined"
  }

  response.userAnswer = userAnswer.questionAnswers // userAnswer.questionAnswers[answerText]  // score
  response.questions = questions  //questions
  response.score = totalScore

  res.status(200).send({response});

});