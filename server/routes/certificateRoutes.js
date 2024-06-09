const express = require("express");
const router = express.Router();

// import '../controller/exam'
const {
  createCertificate,
  deleteCertificate,
  getAllCertificate,
  getOneCertificate,
  updateCertificate,
} = require("../controller/certificate");

const { protect, restrictTo } = require("../controller/auth");

router.route("/").get(getAllCertificate).post(createCertificate);

router
  .route("/:id")
  .get(getOneCertificate)
  .patch(updateCertificate)
  .delete(deleteCertificate);

module.exports = router;
