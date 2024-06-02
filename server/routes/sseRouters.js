const express = require('express');
const router = express.Router();
// import '../controller/chat'
const {getChat} = require('../controller/chat/getChat');

router.
    route("/chat/:id")
        .get(getChat)
        // .post(sendChat);
// router.post("/", forgotPassword);

// router.patch("/updatePassword", protect, updatePassword);


module.exports = router;
