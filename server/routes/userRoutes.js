const express = require("express");

const {
  logout,
  forgotPassword,
  updatePassword,
  resetPassword,
  restrictTo,
  signUp,
  protect,
  activateAccount,
  login,
  updateUser,
} = require("../controller/auth");

const {
  getAllUsers,
  getMe,
  deleteMe,
  toggleUserRole,
  deleteUser,
  updateMe,
  getUser,
  updateIdPhoto,
  followOrganization,
  addAsAdmin,
  unfollowOrganization,
  getUserOrganization,
} = require("../controller/userController");

const { getMyCerts } = require("../controller/certificate");

const { fileUpload } = require("../utils/fileUpload");

const { zip } = require("../utils/zip");
const { validationRules, checkId } = require("../lib/validation");
const {
  getOrganizationId,
} = require("../controller/organization/getOrganizationId");


const router = express.Router();

router.param("id", checkId);
router.param("token", checkId);
router.param("filename", checkId);

router.route("/backup").get(zip);

router.route("/me").get(protect, getMe, getUser);

router.route("/me/cert").get(protect, getMe, getMyCerts);

router.get("/", protect, getAllUsers);
router.get("/logout", protect, logout);

router.post("/signup", validationRules[2], signUp);
router.post("/login", validationRules[3], login);
router.post("/forgotPassword", validationRules[4], forgotPassword);
router.post("/resetPassword/:token", resetPassword);

router.patch("/updatePassword", protect, updatePassword);
router.patch(
  "/updateMe",
  protect,
  getMe,
  updateMe
);
router.patch("/deleteMe", protect, deleteMe);
router.post("/verify-email", activateAccount);

router.post("/profile", fileUpload);
router.patch("/updateIdPhoto", protect, updateIdPhoto);

router.post("/uploads", fileUpload);
router.post("/follow/:id", protect, followOrganization);
router.post("/unfollow/:id", protect, unfollowOrganization);
router.post("/addAdmin", addAsAdmin);

router.get("/organizations", protect, getUserOrganization);
router
  .route("/:id")
  .patch(protect, restrictTo(false), getOrganizationId, updateUser);

router
  .route("/:id")
  .get(protect, getUser) //getUser
  .patch(protect, restrictTo(), toggleUserRole) //toggleUserRole
  .delete(protect, restrictTo(), deleteUser); //deleteUser

module.exports = router;
