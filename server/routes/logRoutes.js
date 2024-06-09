const express = require('express');
const router = express.Router();
const {getLogs} = require('../controller/log')

router
    .route("/")
        .get(getLogs);

module.exports = router;