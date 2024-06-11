const APIError = require("../utils/apiError");

const { body, check } = require("express-validator");

exports.checkId = async (req, res, next, val) => {
  val = val.trim();
  next();
};
// 0 validates the rock Object
// 1 validates the rocktemp Object
// 2 validates the user Object for signup
// 3 validates the user Object for login
// 4 validate forgot password
// 5 validate feedBack

exports.validationRules = [
  [
    //0 rock to room
    body("*.*.*")
      .isEmpty()
      .withMessage("title can not be empty")
      .trim()
      .escape(),
  ],
  [
    //1 
    body("name")
      .notEmpty()
      .withMessage("Title can not be empty")
      .trim()
      .escape(),
  ],
  [
    //2 signup
    body("firstName")
      .isEmpty()
      .withMessage("First Name required")
      .trim()
      .escape()
      .matches(/^[a-zA-Z ]*$/)
      .withMessage("First Name: Only Characters with white space are allowed"),

    // first Name sanitization and validation
    body("lastName")
      .notEmpty()
      .withMessage("Last Name required")
      .trim()
      .escape()
      .matches(/^[a-zA-Z ]*$/)
      .withMessage("Last Name: Only Characters with white space are allowed"),

    body("role")
      .trim()
      .escape()
      .matches(/^[a-zA-Z]*$/)
      .withMessage("Role: Only Characters with no white space are allowed"),

    //email address validation
    body("email")
      .notEmpty()
      .withMessage("Email address cannot be empty")
      .trim()
      .escape()
      .withMessage("Email Address required")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid email address, Provide a valid email address!"),

    body("password")
      .isEmpty()
      .withMessage("Password field cannot be empty")
      .trim()
      .isLength({
        min: 5,
        max: 20,
        minSymbols: 0,
        minUppercase: 1,
      })
      .withMessage(
        "The Password must be between 5-20 characters, atleast one uppercase letter and no symbols"
      ),

    // confirm password validation
    body("passwordConfirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new APIError("Passwords that you entered do not match", 400);
      }
      return true;
    }),
  ],
  [
    //3 login
    //email address validation
    body("email")
      .isEmpty()
      .withMessage("Email address cannot be empty")
      .trim()
      .escape()
      .withMessage("Email Address required")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid email address, Provide a valid email address!"),

    body("password").isEmpty().withMessage("Password field cannot be empty"),
  ],
  [
    //4 forgotPassword
    body("email")
      .isEmpty()
      .withMessage("Please provide your email so that we can verify its you")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid email format"),
  ],
//   [
//     //5 feedback
//     body("email")
//       .trim()
//       .escape()
//       .normalizeEmail()
//       .isEmail()
//       .withMessage("Invalid email address, Provide a valid email address!"),

//     body("subject").trim().escape(),

//     body("name").trim().escape(),

//     body("content")
//       .notEmpty()
//       .withMessage("Content cannot be empty")
//       .isLength({
//         min: 15,
//         max: 300,
//       })
//       .withMessage("Try to summarize your feedBack to 15-300 words")
//       .trim()
//       .escape(),

//     body("type")
//       .trim()
//       .notEmpty()
//       .withMessage("Type cannot be empty")
//       // .isIn
//       .escape()
//       .withMessage("Invalid email address, Provide a valid email address!"),
//   ],
  [
    //6 resetPassword
    body("password")
      .notEmpty()
      .withMessage("Password field cannot be empty")
      .trim()
      .isLength({
        min: 5,
        max: 20,
        minSymbols: 0,
        minUppercase: 1,
      })
      .withMessage(
        "The Password must be between 5-20 characters, atleast one uppercase letter and no symbols"
      ),
    // confirm password validation
    body("passwordConfirm")
      .equals(body("password"))
      .withMessage("Passwords that you entered do not match"),

    // .custom((value, { req }) => {
    //   if (value !== req.body.password) {
    //     console.log(value, req.body.password);
    //     console.log("wrong password");
    //     throw new APIError("Passwords that you entered do not match", 400);
    //   }
    //   return false;
    // })
  ],
];