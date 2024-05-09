// const User = require("../../models/user.model");
// const catchAsync = require("../../utils/catchAsync");
// const APIError = require("../../utils/apiError");
// const Email = require("../../utils/sendMail");

// const { forgotPassword } = require("./forgotPasswordController");

// jest.mock("../../models/user.model");
// jest.mock("../../utils/catchAsync");
// jest.mock("../../utils/apiError");
// jest.mock("../../utils/sendMail");

// describe("Forgot Password Controller", () => {
//   let req, res, next;

//   beforeEach(() => {
//     req = { body: {} };
//     res = {
//       status: jest.fn(() => res),
//       json: jest.fn(),
//     };
//     next = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test("forgotPassword - with valid email", async () => {
//     const user = { email: "test@example.com", createPasswordResetToken: jest.fn(() => "reset_token"), save: jest.fn() };
//     const resetURL = `http://localhost:4000/reset-password?token=reset_token`;

//     req.body.email = user.email;
//     User.findOne.mockResolvedValueOnce(user);
//     Email.mockImplementationOnce(() => ({
//       sendPasswordReset: jest.fn(),
//     }));

//     await forgotPassword(req, res, next);

//     expect(User.findOne).toHaveBeenCalledWith({ email: user.email });
//     expect(user.createPasswordResetToken).toHaveBeenCalled();
//     expect(user.save).toHaveBeenCalledWith({ validateBeforeSave: false });
//     expect(Email).toHaveBeenCalledWith(user, resetURL);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       status: "success",
//       message: "reset_token",
//     });
//   });

//   // Add more test cases for different scenarios like invalid email, error sending email, etc.
// });
