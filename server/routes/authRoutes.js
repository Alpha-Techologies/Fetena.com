const express = require('express');
const router = express.Router();
const resetPassword = require("../auth/resetPassword");
const updatePassword = require("../auth/updatePassword");
const forgotPassword = require("../auth/forgotPassword");


router.post("/forgotPassword", validationRules[4], forgotPassword);
router.post("/resetPassword/:token", resetPassword);

router.patch("/updatePassword", protect, updatePassword);


module.exports = router;
