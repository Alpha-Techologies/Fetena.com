const express = require('express');
const router = express.Router();
const {getLogs} = require('../controller/log');
const { protect, restrictTo } = require('../controller/auth');

router
    .route("/")
        .get(protect,restrictTo(true), getLogs);

module.exports = router;