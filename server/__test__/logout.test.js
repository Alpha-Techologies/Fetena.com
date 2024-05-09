// const { TokenModel } = require("../../models/Token.model");
// const catchAsync = require("../../utils/catchAsync");
// const { StatusCodes } = require("http-status-codes");

// const { logout } = require("./logoutController");

// jest.mock("../../models/Token.model");
// jest.mock("../../utils/catchAsync");

// describe("Logout Controller", () => {
//   let req, res, next;

//   beforeEach(() => {
//     req = { user: { _id: "user_id" } };
//     res = {
//       status: jest.fn(() => res),
//       json: jest.fn(),
//       cookie: jest.fn(),
//     };
//     next = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test("logout - successfully log out", async () => {
//     TokenModel.findOneAndDelete.mockResolvedValueOnce();

//     await logout(req, res, next);

//     expect(TokenModel.findOneAndDelete).toHaveBeenCalledWith({ user: req.user._id });
//     expect(res.cookie).toHaveBeenCalledWith("accessToken", "logout", {
//       httpOnly: true,
//       expires: expect.any(Date),
//     });
//     expect(res.cookie).toHaveBeenCalledWith("refreshToken", "logout", {
//       httpOnly: true,
//       expires: expect.any(Date),
//     });
//     expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
//     expect(res.json).toHaveBeenCalledWith({
//       status: "success",
//     });
//   });

//   // Add more test cases for different scenarios if needed
// });
