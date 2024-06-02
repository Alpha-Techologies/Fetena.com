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
} = require("../controller/auth");

const {
  getAllUsers,
  getMe,
  getMyEdits,
  deleteMe,
  toggleUserRole,
  deleteUser,
  updateMe,
  getUser,
  filterUserUpdateFields,
  updateIdPhoto,
  followOrganization,
  addAsAdmin,
  unfollowOrganization,
  getUserOrganization,
  // getProfile,
} = require("../controller/userController");

const { fileUpload } = require("../utils/fileUpload");

const { zip } = require("../utils/zip");
const { validationRules, checkId } = require("../lib/validation");

// const {
//   getUserProfile,
//   uploadUserProfile,
//   deleteUserProfile,
//   buffer,
//   resizePhoto,
// } = require("../lib/imageUpload");

const router = express.Router();

router.param("id", checkId);
router.param("token", checkId);
router.param("filename", checkId);

router.route("/backup").get(zip);

router.get("/", protect, getAllUsers);
router.get("/me", protect, getMe, getUser);
router.get("/logout", protect, logout);
router.get("/myEdits", protect); //getMyEdits

router.post("/signup", validationRules[2], signUp);
router.post("/login", validationRules[3], login);
router.post("/forgotPassword", validationRules[4], forgotPassword);
router.post("/resetPassword/:token", resetPassword);

router.patch("/updatePassword", protect, updatePassword);
router.patch(
  "/updateMe",
  protect,
  getMe,
  // filterUserUpdateFields("firstName", "lastName", "email", "phoneNumber"),
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
// router.patch("/activate/:token", activateAccount);
// verify-email

// OTP
// LOGIN WITH GOOGLE

// router.get(
//   "/image/:filename",
//   protect,
//   restrictTo("manager", "reception", "user"),
//   getUserProfile /**gets the filename from the user profile*/
// );
// router.patch(
//   "/image/:id",
//   protect,
//   restrictTo("manager", "reception", "user"),
//   uploadUserProfile.single("photo"),
//   getProfile /*gets the id from the users profile photo**/,
//   deleteUserProfile
// );
// router.delete(
//   "/image/:id",
//   protect,
//   restrictTo("manager", "reception", "user"),
//   deleteUserProfile
// );

// router
//   .route("/")
//   .get(protect, restrictTo("manager"), getAllUsers) //getAllUsers
//   .post() //export doesnt make sene, create another route
//   .patch(
//     protect,
//     // filterUserUpdateFields(
//     //   "firstName",
//     //   "lastName",
//     //   "email",
//     // //   "woreda",
//     // //   "city",
//     // //   "subCity",
//     //   "phoneNumber"
//     // ),
//     getMe,
//     updateMe
//   )
//   .delete(protect, deleteMe); // deactivate user

router
  .route("/:id")
  .get(protect, getUser) //getUser
  //   .post() //
  .patch(protect, restrictTo(), toggleUserRole) //toggleUserRole
  .delete(protect, restrictTo(), deleteUser); //deleteUser

module.exports = router;
