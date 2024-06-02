// // const signUpController = require('../signup');
// // const User = require('../../../models/user.model');
// // const Email = require('../../../utils/sendMail');
// // const APIError = require('../../../utils/apiError');

// // describe('signUp Controller', () => {
// //   it('should handle missing user data or files', async () => {
// //     const req = {
// //       files: null,
// //       body: {},
// //     };

// //     const next = jest.fn();

// //     await signUpController.signUp(req, {}, next);

// //     expect(next).toHaveBeenCalledWith(new APIError("There is no file", 404));
// //   }),

// //   it('should sign up a new user with valid data and files', async () => {
// //     const req = {
// //       files: {
// //         profilePhoto: { mimetype: 'image/png' },
// //         idPhoto: { mimetype: 'image/jpeg' } 
// //       },
// //       body: {
// //         data: JSON.stringify({
// //           firstName: "yonas",
// //           lastName: "dessie",
// //           role: "user",
// //           email: "alemrade40@gmail.com",
// //           password: "Password123",
// //           passwordConfirm: "Password123"
// //         })
// //       }
// //     };

// //     User.findOne = jest.fn().mockResolvedValue(null);

// //     User.prototype.save = jest.fn().mockResolvedValue({

// //       email: req.body.data.email,
     
// //     });

// //     Email.prototype.sendPasswordReset = jest.fn().mockResolvedValue();

// //     console.log = jest.fn();

// //     const res = {
// //       status: jest.fn().mockReturnThis(), 
// //       json: jest.fn() 
// //     };

// //     await signUpController.signUp(req, res, jest.fn());

// //     expect(User.findOne).toHaveBeenCalled(); 
// //     expect(User.prototype.save).toHaveBeenCalled(); 
// //     expect(Email.prototype.sendPasswordReset).toHaveBeenCalled(); 
// //     expect(res.status).toHaveBeenCalledWith(201); 
// //     expect(res.json).toHaveBeenCalledWith({
// //       status: 'success',
// //       message: expect.any(String) 
// //     });
// //   }),
// //   it('should handle invalid file types', async () => {
// //     const req = {
// //       files: {
// //         profilePhoto: { mimetype: 'text/plain' }, 
// //         idPhoto: { mimetype: 'text/plain' } 
// //       },
// //       body: {
// //         data: JSON.stringify({
// //           email: 'test@example.com',
// //         })
// //       }
// //     };
// //     // Mock next function
// //     const next = jest.fn();
// //     await signUpController.signUp(req, {}, next);
// //     expect(next).toHaveBeenCalledWith(new APIError("Please a Proper Profile Photo", 400));
// //     expect(next).toHaveBeenCalledWith(new APIError("Please a Proper ID Photo", 400));
// //   });
// // });





// const { StatusCodes } = require('http-status-codes');
// const { signUp } = require('../signup'); // Import the signup controller function
// const User = require('../../../models/user.model');
// const Email = require('../../../utils/sendMail');
// const APIError = require('../../../utils/apiError');

// jest.mock('../../../models/user.model'); // Mock the User model
// jest.mock('../../../utils/sendMail'); // Mock the Email module

// describe('Signup Page', () => {
//   let req, res, next;

//   beforeEach(() => {
//     req = {
//       body: {
//         data: JSON.stringify({
//           email: 'test@example.com', // Test email
//           // Other user data...
//         }),
//       },
//       files: {
//         profilePhoto: { mimetype: 'image/png' }, // Mocked profile photo
//         idPhoto: { mimetype: 'image/png' }, // Mocked ID photo
//       },
//     };
//     res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     next = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should return 404 if there is no file', async () => {
//     req.files = null; // No files provided
//     await signUp(req, res, next);
//     expect(next).toHaveBeenCalledWith(new APIError('There is no file', StatusCodes.NOT_FOUND));
//   });

//   it('should return 404 if there is no user data', async () => {
//     req.body.data = null; // No user data provided
//     await signUp(req, res, next);
//     expect(next).toHaveBeenCalledWith(new APIError('There is no user data', StatusCodes.NOT_FOUND));
//   });

//   it('should return 400 if profile photo mimetype is invalid', async () => {
//     req.files.profilePhoto.mimetype = 'application/pdf'; // Invalid mimetype
//     await signUp(req, res, next);
//     expect(next).toHaveBeenCalledWith(new APIError('Please a Proper Profile Photo', StatusCodes.BAD_REQUEST));
//   });

//   it('should return 400 if ID photo mimetype is invalid', async () => {
//     req.files.idPhoto.mimetype = 'application/pdf'; // Invalid mimetype
//     await signUp(req, res, next);
//     expect(next).toHaveBeenCalledWith(new APIError('Please a Proper ID Photo', StatusCodes.BAD_REQUEST));
//   });

//   it('should return 400 if email is already registered', async () => {
//     User.findOne.mockResolvedValueOnce({ email: req.body.data.email }); // Mock finding an existing user
//     await signUp(req, res, next);
//     expect(next).toHaveBeenCalledWith(new APIError(`Email already registered`, StatusCodes.BAD_REQUEST));
//   });

//   it('should create a new user and send activation email', async () => {
//     const activationToken = 'mocked-activation-token';
//     User.findOne.mockResolvedValueOnce(null); // No user found (email is not registered)
//     User.mockImplementation(() => ({ // Mock the User constructor
//       save: jest.fn().mockResolvedValueOnce({}), // Mock user save method
//       createActivationToken: jest.fn().mockReturnValueOnce(activationToken), // Mock createActivationToken method
//     }));
//     Email.mockImplementation(() => ({ // Mock the Email constructor
//       sendPasswordReset: jest.fn().mockResolvedValueOnce(), // Mock sendPasswordReset method
//     }));

//     await signUp(req, res, next);

//     expect(User).toHaveBeenCalledWith(req.body.data); // User constructor called with user data
//     expect(req.files.profilePhoto).toBeDefined(); // Profile photo uploaded
//     expect(req.files.idPhoto).toBeDefined(); // ID photo uploaded
//     expect(User.prototype.createActivationToken).toHaveBeenCalled(); // createActivationToken called
//     expect(Email).toHaveBeenCalledWith(expect.any(Object), expect.any(String)); // Email constructor called with user and activation URL
//     expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED); // Response status set to CREATED
//     expect(res.json).toHaveBeenCalledWith({
//       status: 'success',
//       message: activationToken,
//     }); // Response JSON with activation token
//   });

//   it('should handle email sending error', async () => {
//     User.findOne.mockResolvedValueOnce(null); // No user found (email is not registered)
//     User.mockImplementation(() => ({ // Mock the User constructor
//       save: jest.fn().mockResolvedValueOnce({}), // Mock user save method
//       createActivationToken: jest.fn().mockReturnValueOnce('mocked-activation-token'), // Mock createActivationToken method
//     }));
//     Email.mockImplementation(() => ({ // Mock the Email constructor
//       sendPasswordReset: jest.fn().mockRejectedValueOnce(new Error('Email sending failed')), // Mock sendPasswordReset method to throw error
//     }));

//     await signUp(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR); // Response status set to INTERNAL_SERVER_ERROR
//     expect(next).toHaveBeenCalledWith(new APIError('There was an error sending the email. Try again later!', 500)); // Error handler called
//   });
// });
