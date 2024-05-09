// const User = require("../../models/user.model");
// const catchAsync = require("../../utils/catchAsync");
// const APIError = require("../../utils/apiError");
// const { StatusCodes } = require("http-status-codes");

// const { updatePassword } = require("./updatePasswordController");

// jest.mock("../../models/user.model");
// jest.mock("../../utils/catchAsync");
// jest.mock("../../utils/apiError");

// describe("Update Password Controller", () => {
//   let req, res, next;

//   beforeEach(() => {
//     req = { 
//       user: { id: "user_id" }, 
//       body: { passwordCurrent: "current_password", password: "new_password" }
//     };
//     res = {
//       status: jest.fn(() => res),
//       json: jest.fn(),
//     };
//     next = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test("updatePassword - with correct current password", async () => {
//     const user = { 
//       correctPassword: jest.fn(() => true), 
//       password: "current_password", 
//       passwordConfirm: undefined,
//       save: jest.fn(),
//     };

//     User.findById.mockResolvedValueOnce(user);

//     await updatePassword(req, res, next);

//     expect(User.findById).toHaveBeenCalledWith(req.user.id);
//     expect(user.correctPassword).toHaveBeenCalledWith(req.body.passwordCurrent, user.password);
//     expect(user.password).toBe(req.body.password);
//     expect(user.passwordConfirm).toBe(undefined);
//     expect(user.save).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
//     expect(res.json).toHaveBeenCalledWith({
//       status: "success",
//     });
//   });

//   test("updatePassword - with incorrect current password", async () => {
//     const user = { correctPassword: jest.fn(() => false) };

//     User.findById.mockResolvedValueOnce(user);

//     await updatePassword(req, res, next);

//     expect(User.findById).toHaveBeenCalledWith(req.user.id);
//     expect(user.correctPassword).toHaveBeenCalledWith(req.body.passwordCurrent, user.password);
//     expect(APIError).toHaveBeenCalledWith("Your current password is wrong.", StatusCodes.UNAUTHORIZED);
//     expect(next).toHaveBeenCalledWith(expect.any(APIError));
//   });

//   // Add more test cases for different scenarios if needed
// });
