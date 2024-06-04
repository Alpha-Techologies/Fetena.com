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

  // userAnswer.questionAnswers.forEach(async (userAnswer) => {
  //   // console.log('userAnswer',userAnswer,'\n')
  //   let question = null;
  //   for (let i = 0; i < questions.length; i++) {
  //       if (questions[i]._id.equals(userAnswer.questionId._id)) {
  //           question = questions[i];
  //           break;
  //       }
  //   }
  //   if (question) {
  //     // Handle different question types separately 
  //     const userAnswerText = userAnswer.answerText.toLowerCase().trim();
  //     const correctAnswerText = question.correctAnswer.toLowerCase().trim();
  //     // console.log(userAnswerText,correctAnswerText,'\n')

  //       if (question.questionType === 'True/False' || question.questionType === 'choose' || question.questionType === 'matching') {
  //           // Perform case-insensitive string comparison for true/false and choice questions
  //           // here
  //           // if (userAnswerText === correctAnswerText) {
  //           //     userAnswer.point = question.points 
  //           //     totalScore += question.points; // Increment score if answers match
  //           // }
  //       } else {
  //           // Handle other question types (e.g., short userAnswer.questionAnswers[i], essay) here
  //           // Add your logic for evaluating those types of questions
  //           // For simplicity, we'll just assume all other types are manually graded
  //           // and give full points if the userAnswer.questionAnswers[i] is not empty
  //           console.log('questionType',question.questionType,'\n')
  //           if (userAnswer.answerText.trim() !== '') {
  //             const prompt =
  //             "I am giving you an a question in a json file try to understand and and create an appropriate tags for this question and in your return make it a json file that has an object with a key tag and an array of string that are going to be the tags and make the tags short and concise and userAnswer.questionAnswers[i] me with a json format string in which i can take your output and use the json.parse" +
  //             JSON.stringify({
  //               question: question.questionText,
  //               options: question.questionChoice,
  //               type: question.questionType,
  //             });
  //             const result = await togetherManager.performInference(prompt);
  //             console.log('result',result)
  //             userAnswer.point = question.points
  //             totalScore += 0; // Give full points if userAnswer.questionAnswers[i] is not empty
  //               // totalScore += question.points; // Give full points if userAnswer.questionAnswers[i] is not empty
  //           }
  //       }
  //   }
  // });
  // let userAnswer.questionAnswers[i] = null
  for (let i = 0; i < userAnswer.questionAnswers.length; i++) {

    // userAnswer.questionAnswers[i] = userAnswer.questionAnswers[i]
  // console.log('userAnswer',userAnswer,'\n')
    let question = null;
    for (let j = 0; j < questions.length; j++) {
        if (questions[j]._id.equals(userAnswer.questionAnswers[i].questionId._id)) {
            question = questions[j];
            // console.log(question)
            break;
        }
    }
    if (question) {
      // Handle different question types separately 
      const answerText = userAnswer.questionAnswers[i].answerText.toLowerCase().trim();
      const correctAnswerText = question.correctAnswer.toLowerCase().trim();
      // console.log(answerText,correctAnswerText,'\n')

        if (question.questionType === 'True/False' || question.questionType === 'choose' || question.questionType === 'matching') {
            // Perform case-insensitive string comparison for true/false and choice questions
            // here
            // if (answerText === correctAnswerText) {
            //     userAnswer.questionAnswers[i].point = question.points 
            //     totalScore += question.points; // Increment score if answers match
            // }
        } else {
            // Handle other question types (e.g., short answer, essay)
            if (userAnswer.questionAnswers[i].answerText.trim() !== '') {
              const prompt = shortAnswer(question.questionText, question.correctAnswer, question.points, question.correctAnswer, userAnswer.questionAnswers[i].answerText.trim())
              
              const result = await togetherManager.performInference(prompt);
              console.log('result',result.trim());
              userAnswer.questionAnswers[i].reason = result.replaceAll('\n','')
              userAnswer.questionAnswers[i].point = 0;
              // totalScore += 0; // Give full points if userAnswer.questionAnswers[i] is not empty
              //   totalScore += question.points; // Give full points if userAnswer.questionAnswers[i] is not empty
            }
          }
        }
      } 
      userAnswer.score = totalScore
      await userAnswer.save()

  // console.log(userAnswer.score)

  // console.log(exam.privateAnswer)


  // console.log(exam.privateScore)

  var response = {}

  // response.questions = questions  //questions
  // response.userAnswer = userAnswer.questionAnswers // userAnswer.questionAnswers[answerText]  // score
  // // response.exam = exam // exam.questions[correctAnswer] //
  // response.score = totalScore 

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

  // const prompt =
  //   "I am giving you an a question in a json file try to understand and and create an appropriate tags for this question and in your return make it a json file that has an object with a key tag and an array of string that are going to be the tags and make the tags short and concise and userAnswer.questionAnswers[i] me with a json format string in which i can take your output and use the json.parse" +
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
