const express = require('express');
const router = express.Router();
// import '../controller/exam'
const {createExam, deleteExam, getOneExam, getAllExam, updateExam} = require('../controller/exam')

router
    .route("/")
        .get(getAllExam)
        .post(createExam)
        
router
    .route("/:id")
        .get(getOneExam)
        .put(updateExam)
        .delete(deleteExam);

module.exports = router;
