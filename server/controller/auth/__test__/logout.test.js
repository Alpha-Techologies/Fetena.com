// const { logout } = require("../logout");
// const { TokenModel } = require("../../../models/Token.model");
// const { StatusCodes } = require("http-status-codes");

// jest.mock("../../../models/Token.model", () => ({
//   findOneAndDelete: jest.fn(),
// }));

// describe("Logout Controller", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should successfully log out the user", async () => {
//     const req = {
//       user: { _id: "user_id" },
//     };

//     const res = {
//       cookie: jest.fn(),
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await logout(req, res);

//     expect(TokenModel.findOneAndDelete).toHaveBeenCalledWith({
//       user: req.user._id,
//     });

//     expect(res.cookie).toHaveBeenCalledWith("accessToken", "logout", {
//       httpOnly: true,
//       expires: expect.any(Date),
//     });

//     expect(res.cookie).toHaveBeenCalledWith("refreshToken", "logout", {
//       httpOnly: true,
//       expires: expect.any(Date),
//     });

//     expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
//     expect(res.json).toHaveBeenCalledWith({ status: "success" });
//   });

// });
