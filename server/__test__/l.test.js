// const { StatusCodes } = require("http-status-codes");
// const APIError = require("../../utils/apiError");
// const createTokenUser = require("../../utils/createTokenUser");
// const { attachCookiesToResponse } = require("../../utils/jwt");
// const catchAsync = require("../../utils/catchAsync");
// const User = require("../../models/user.model");
// const { TokenModel } = require("../../models/Token.model");
// const crypto = require("crypto");

// // Import the login function
// const { login } = require("./loginController");

// // Mocking the dependencies
// jest.mock("http-status-codes");
// jest.mock("../../utils/apiError");
// jest.mock("../../utils/createTokenUser");
// jest.mock("../../utils/jwt");
// jest.mock("../../utils/catchAsync");
// jest.mock("../../models/user.model");
// jest.mock("../../models/Token.model");
// jest.mock("crypto");

// describe("Login Controller", () => {
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

//   test("login - with valid email and password", async () => {
//     const user = { _id: "user_id", email: "test@example.com", password: "hashed_password", active: true, isVerified: true };
//     const tokenUser = { _id: "user_id", email: "test@example.com" };
//     const refreshToken = "refresh_token";

//     req.body.email = user.email;
//     req.body.password = "password";

//     User.findOne.mockResolvedValueOnce(user);
//     user.correctPassword = jest.fn(() => true);
//     createTokenUser.mockReturnValueOnce(tokenUser);
//     TokenModel.findOne.mockResolvedValueOnce(null);
//     crypto.randomBytes.mockReturnValueOnce({ toString: jest.fn(() => refreshToken) });

//     await login(req, res, next);

//     expect(User.findOne).toHaveBeenCalledWith({ email: user.email });
//     expect(createTokenUser).toHaveBeenCalledWith(user);
//     expect(TokenModel.findOne).toHaveBeenCalledWith({ user: user._id });
//     expect(crypto.randomBytes).toHaveBeenCalledWith(40);
//     expect(attachCookiesToResponse).toHaveBeenCalledWith({ res, user: tokenUser, refreshToken });
//     expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
//     expect(res.json).toHaveBeenCalledWith({ user: tokenUser });
//   });

//   // Add more test cases for different scenarios like invalid email, invalid password, user not found, etc.
// });
