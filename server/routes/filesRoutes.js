const express = require('express');
const router = express.Router();



router.route('/uploads').post(uploadProductImage);
module.exports = router