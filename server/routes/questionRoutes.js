const express = require('express');
const router = express.Router();
// import '../controller/Question'
const {createQuestion, deleteQuestion, getOneQuestion, getAllQuestion, updateQuestion} = require('../controller/question')

router
    .route("/")
        .get(getAllQuestion)
        .post(createQuestion)
        
router
    .route("/:id")
        .get(getOneQuestion)
        .put(updateQuestion)
        .delete(deleteQuestion);

module.exports = router;
