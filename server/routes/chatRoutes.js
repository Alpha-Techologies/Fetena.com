const express = require('express');
const router = express.Router();
const {sendChat} = require('../controller/chat/sendChat');



// router.get("/chat/:id", getChat);
router.
    route("/:id")
        .post(sendChat);
// router.post("/", forgotPassword);

// router.patch("/updatePassword", protect, updatePassword);


module.exports = router;
