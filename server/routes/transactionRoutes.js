const { restrictTo, protect } = require("../controller/auth");
const {
  getAllOrganizationTransaction,
  getAllTransaction,
  getOneTransaction,
} = require("../controller/transaction");

const router = require("express").Router();

router.route("/").get(protect, restrictTo(false), getAllTransaction);
router
  .route("/organizations/:id")
  .get(protect, restrictTo(true), getAllOrganizationTransaction);
router.route("/:id").get(protect, getOneTransaction);

module.exports = router;
