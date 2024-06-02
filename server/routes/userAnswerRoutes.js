const express = require('express');
const router = express.Router();

const {
    createUserAnswer,
    // deleteUserAnswer,
    // getAllUserAnswer,
    // getOneUserAnswer,
    // updateUserAnswer,
    evaluateUserAnswer
} = require('../controller/userAnswer')

router
    .route("/:id")
        // .get(getOneQuestion)
        .post(evaluateUserAnswer)
        // .put(updateQuestion)
        // .delete(deleteQuestion);

router
    .route("/")
        // .get(getAllQuestion)
        .post(createUserAnswer)
        

module.exports = router;
