const express = require("express");

const {
  logout,
  forgotPassword,
  updatePassword,
  resetPassword,
  restrictTo,
  signUp,
  protect,
  activateAccount
} = require("./../controller/authController");

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
  // getProfile,
} = require("./../controller/userController");

const {zip} = require("./../utils/zip")

const { validationRules, checkId } = require("../lib/validation");
const { login } = require("../controller/auth/login");
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


router
    .route("/backup")
    .get(zip)
  

// router.get("/", protect, getAllUsers);
router.get("/me", protect, getMe, getUser);
router.get("/logout", logout);
router.get("/myEdits", protect);//getMyEdits

router.post("/signup",validationRules[2], signUp);
router.post("/login", validationRules[3], login);
router.post("/forgotPassword", validationRules[4], forgotPassword);
router.post("/resetPassword/:token", resetPassword);

router.patch("/updatePassword", protect, updatePassword);
router.patch("/updateMe", protect, updateMe);
router.patch("/deleteMe", protect, deleteMe);
router.patch("/activate/:token", activateAccount);
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
//   .get(protect, restrictTo("manager", "reception", "user"), getUser) //getUser
//   .post() //
  .patch(
    protect,
    restrictTo("manager"),
    toggleUserRole
  ) //toggleUserRole
//   .delete(protect, restrictTo("manager"), deleteUser); //deleteUser

module.exports = router;