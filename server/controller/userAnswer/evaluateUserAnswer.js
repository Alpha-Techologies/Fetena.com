// const userAnswer = require("../../models/user.answer.model");
const catchAsync = require("./../../utils/catchAsync");
const TogetherManager = require("../../AI")


exports.evaluateUserAnswer =  catchAsync(async (req, res, next) => {
    console.log('evaluated')

    const apiKey = process.env.TOGETHER_API_KEY;
    const togetherManager = new TogetherManager(apiKey, 'togethercomputer/llama-2-70b-chat', 1000, true);
    const prompt = 'Just say Hi';
    const result = await togetherManager.performInference(prompt);
    // console.log('result',result);
    
    
    res.status(200).json({ message: result });
})