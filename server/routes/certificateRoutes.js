const express = require("express");
const router = express.Router();

const takeExamRouter = require("./takeExamRoutes");

// import '../controller/exam'
const {
    createCertificate,
    deleteCertificate,
    getAllCertificate,
    getOneCertificate,
    updateCertificate
} = require("../controller/certificate");

router.use(takeExamRouter);

const { protect,restrictTo } = require("../controller/auth");

router
  .route("/")
  .get(getAllCertificate)
  .post(createCertificate)

router
  .route("/:id")
  .get(getOneCertificate)
  .patch(updateCertificate)
  .delete(deleteCertificate);

  module.exports = router