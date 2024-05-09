// // const { signUp } = require("../controller/auth/signUp");
// // const { app } = require("../app");
// // const User = require("../models/user.model");
// // const APIError = require("../utils/apiError");

// // jest.mock("../models/user.model");
// // jest.mock("../utils/sendMail"); // Mock the Email module
// // jest.mock("../utils/fileUpload"); // Mock the fileUpload function
// // let req;
// // let res;
// // let next;

// // beforeEach(() => {
// //   req = {
// //     files: null,
// //     body: {
// //       data: null,
// //     },
// //   };
// //   res = {
// //     status: jest.fn().mockReturnThis(),
// //     json: jest.fn(),
// //   };
// //   next = jest.fn();
// // });

// // // describe('signUp', () => {
// // //   let req;
// // //   let res;
// // //   let next;

// // //   beforeEach(() => {
// // //     req = {
// // //       files: {
// // //         profilePhoto: { mimetype: 'image/png' },
// // //         idPhoto: { mimetype: 'image/png' }
// // //       },
// // //       body: {
// // //         data: JSON.stringify({ email: 'test@example.com', /* other user data */ })
// // //       }
// // //     };
// // //     res = {
// // //       status: jest.fn().mockReturnThis(),
// // //       json: jest.fn()
// // //     };
// // //     next = jest.fn();
// // //   });

// // //   afterEach(() => {
// // //     jest.clearAllMocks();
// // //   });

// // test("should create a new user", async () => {
// //   User.findOne.mockResolvedValue(null); // User does not exist yet
// //   User.prototype.save.mockResolvedValueOnce({}); // Mock successful user save

// //   await signUp(req, res, next);

// //   expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
// //   expect(User.prototype.save).toHaveBeenCalled();
// //   expect(res.status).toHaveBeenCalledWith(201);
// //   expect(res.json).toHaveBeenCalledWith({
// //     status: "success",
// //     message: expect.any(String), // We can improve this assertion based on what you expect to return
// //   });
// //   expect(next).not.toHaveBeenCalled();
// // });

// // // Add more test cases to cover other scenarios such as user already exists, file upload failure, email sending failure, etc.
// // // });

// // test("should return 404 error if no files are provided", async () => {
// //   req.files = null;

// //   await signUp(req, res, next);

// //   expect(next).toHaveBeenCalledWith(new APIError("There is no file", 404));
// //   expect(User.findOne).not.toHaveBeenCalled();
// //   expect(User.prototype.save).not.toHaveBeenCalled();
// // });

// // // test('should return 404 error if no user data is provided', async () => {
// // //   req.body.data = null;

// // //   await signUp(req, res, next);

// // //   expect(next).toHaveBeenCalledWith(new APIError('There is no user data', 404));
// // //   expect(User.findOne).not.toHaveBeenCalled();
// // //   expect(User.prototype.save).not.toHaveBeenCalled();
// // // });


// const { signUp } = require('../controller/auth/signup');
// const User = require('../models/user.model');
// const APIError = require('../utils/apiError');
// const Email = require('../utils/sendMail');
// const { StatusCodes } = require('http-status-codes');

// // Mocking dependencies
// jest.mock('../utils/sendMail');

// describe('signUp function', () => {
//   // Mocking req, res, next objects
//   const req = {};
//   const res = {
//     status: jest.fn(() => res),
//     json: jest.fn(),
//   };
//   const next = jest.fn();

//   afterEach(() => {
//     jest.clearAllMocks();
//   });
//   test('Valid Sign-Up', async () => {
//     // Mock valid request data
//     req.files = {
//       profilePhoto: { mimetype: 'image/jpeg' },
//       idPhoto: { mimetype: 'image/jpeg' },
//     };
//     req.body = { data: JSON.stringify({ email: 'test@example.com' }) };
  
//     // Mock user not existing
//     User.findOne = jest.fn().mockResolvedValue(null);
//     // Mock user creation and email sending
//     User.prototype.save = jest.fn().mockResolvedValue({});
//     Email.prototype.sendPasswordReset = jest.fn().mockResolvedValue({});
  
//     await signUp(req, res, next);
  
//     expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
//       status: 'success',
//       message: expect.any(String), // Assert activation token is returned
//     }));
//   });
  

//   // Implement other test cases similarly...
// });
