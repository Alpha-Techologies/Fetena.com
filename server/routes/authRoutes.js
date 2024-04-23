const express = require('express');
const router = express.Router();
import '../controller/auth'



router.post("/forgotPassword", validationRules[4], forgotPassword);
router.post("/resetPassword/:token", resetPassword);

router.patch("/updatePassword", protect, updatePassword);


module.exports = router;
