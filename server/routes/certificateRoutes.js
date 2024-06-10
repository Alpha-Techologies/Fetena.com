const express = require("express");
const router = express.Router();

const {
  createCertificate,
  deleteCertificate,
  getAllCertificate,
  getOneCertificate,
  updateCertificate,
} = require("../controller/certificate");

const { protect, restrictTo } = require("../controller/auth");

router
  .route("/")
    .post(createCertificate)
    .get(protect, getAllCertificate)

router
  .route("/:id")
  .get(protect, getOneCertificate)
  .patch(protect, updateCertificate)
  .delete(protect, deleteCertificate);

module.exports = router;
