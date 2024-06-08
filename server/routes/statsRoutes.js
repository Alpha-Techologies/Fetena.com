const express = require("express");
const router = express.Router();

const {    
    getOrgStats,
} = require("../controller/stats/getOrgStats");

const {    
    getExamStats
} = require("../controller/stats/getExamStats");

const { protect,restrictTo } = require("../controller/auth");

router
    .route("/org/:id")
        .get(getOrgStats)

router
    .route("/exam/:id")
        .get(getExamStats)

module.exports = router