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
const {
  getOrganizationId,
} = require("../controller/organization/getOrganizationId");
const {
  addOrganizationForCertificate,
} = require("../controller/certificate/createCertificate");

router
  .route("/")
  .post(
    protect,
    addOrganizationForCertificate,
    createCertificate
  )
  .get(protect, getAllCertificate);

router
  .route("/:id")
  .get(protect, getOneCertificate)
  .patch(protect, updateCertificate)
  .delete(protect, deleteCertificate);




module.exports = router;
