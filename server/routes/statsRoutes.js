const express = require("express");
const router = express.Router();

const {    
    getOrgStats,
} = require("../controller/stats/getOrgStats");

const {    
    getExamStats,
} = require("../controller/stats/getExamStats");

const { protect,restrictTo } = require("../controller/auth");

router
    .route("/org/:id")
        .get(protect,restrictTo(true), getOrgStats)

router
    .route("/exam/:id")
        .get(protect,restrictTo(true), getExamStats)

module.exports = router