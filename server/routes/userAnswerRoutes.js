const express = require('express');
const router = express.Router();


const {
    createUserAnswer,
    deleteUserAnswer,
    getAllUserAnswer,
    getOneUserAnswer,
    updateUserAnswer,
    evaluateUserAnswer
} = require('../controller/userAnswer')

router
    .route("/:id")
    .get(getOneUserAnswer)
    .post(createUserAnswer)

router
    .route("/eval/:id")
    .post(evaluateUserAnswer)
    // .post(evaluateUserAnswer)
    // .put(updateQuestion)
    // .delete(deleteQuestion);

router
    .route("/")
        // .get(getAllQuestion)
        

module.exports = router;
