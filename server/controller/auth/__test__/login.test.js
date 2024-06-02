// const { login } = require("../login");
// const { StatusCodes } = require("http-status-codes");
// const APIError = require("../../../utils/apiError");
// const User = require("../../../models/user.model");
// const { TokenModel } = require("../../../models/Token.model");
// const { attachCookiesToResponse } = require("../../../utils/jwt");
// const createTokenUser = require("../../../utils/createTokenUser");

// jest.mock("../../../models/user.model", () => ({
//   findOne: jest.fn(),
// }));

// jest.mock("../../../models/Token.model", () => ({
//   findOne: jest.fn(),
//   create: jest.fn(),
// }));

// jest.mock("../../../utils/jwt", () => ({
//   attachCookiesToResponse: jest.fn(),
// }));

// jest.mock("../../../utils/apiError");

// describe("Login Controller", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should successfully log in with valid email and password", async () => {
//     const req = {
//       body: {
//         email: "test@example.com",
//         password: "Password123",
//       },
//       ip: "127.0.0.1",
//       headers: {
//         "user-agent": "Test User Agent",
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const user = {
//       _id: "user_id",
//       email: "test@example.com",
//       password: "hashed_password",
//       active: true,
//       isVerified: true,
//       correctPassword: jest.fn().mockReturnValue(true),
//     };

//     User.findOne.mockResolvedValueOnce(user);

//     const tokenUser = createTokenUser(user);

//     const refreshToken = "random_refresh_token";

//     const existingToken = null;

//     TokenModel.findOne.mockResolvedValueOnce(existingToken);

//     const expectedUserToken = {
//       refreshToken,
//       ip: req.ip,
//       userAgent: req.headers["user-agent"],
//       user: user._id,
//     };

//     TokenModel.create.mockResolvedValueOnce(expectedUserToken);

//     await login(req, res);

//     expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
//     expect(TokenModel.findOne).toHaveBeenCalledWith({ user: user._id });

//     expect(TokenModel.create).toHaveBeenCalledWith(expectedUserToken);

//     expect(attachCookiesToResponse).toHaveBeenCalledWith({
//       res,
//       user: tokenUser,
//       refreshToken,
//     });

//     expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
//     expect(res.json).toHaveBeenCalledWith({ user: tokenUser });
//   });

//   // Write more test cases for other scenarios...
// });
