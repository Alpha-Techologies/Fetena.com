const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionID: {
    type: mongoose.Schema.Types.ObjectId,
    // supposed to make path unique
    // unique: true,
    ref: 'Question',
    required: true
  },
  answerText: {
    type: String,
    required: true
  }
});

// supposed to make path unique
// AnswerSchema.path('questionID').validate(async function(value) {
//   const question = await mongoose.model('Question').findById(value);
//   return !!question;
// }, 'Invalid question ID');


const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
