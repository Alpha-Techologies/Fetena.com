const signUpController = require('../controller/auth/signup');
const User = require('../models/user.model');
const Email = require('../utils/sendMail');
const APIError = require('../utils/apiError');

describe('signUp Controller', () => {
  it('should handle missing user data or files', async () => {
    // Prepare request objects with missing data or files
    const req = {
      // No files
      files: null,
      // No user data
      body: {},
    };

    // Mock next function
    const next = jest.fn();

    // Send request to signUpController.signUp()
    await signUpController.signUp(req, {}, next);

    // Assert that appropriate APIError is thrown with status code 404
    expect(next).toHaveBeenCalledWith(new APIError("There is no file", 404));
  }),

  it('should sign up a new user with valid data and files', async () => {
    // Prepare valid request object with necessary data and files
    const req = {
      files: {
        profilePhoto: { mimetype: 'image/png' }, // Example profile photo
        idPhoto: { mimetype: 'image/jpeg' } // Example ID photo
      },
      body: {
        data: JSON.stringify({// Example email
          firstName: "yonas",
          lastName: "dessie",
          role: "user",
          email: "alemrade40@gmail.com",
          password: "Password123",
          passwordConfirm: "Password123"
        })
      }
    };

    // Mock User.findOne() to return null, indicating that email is not registered yet
    User.findOne = jest.fn().mockResolvedValue(null);

    // Mock User.save() to return a new user object
    User.prototype.save = jest.fn().mockResolvedValue({
      // Mock user object with required properties
      // Adjust this according to your User model structure
      email: req.body.data.email,
      // Other properties
    });

    // Mock Email.sendPasswordReset() to return successfully
    Email.prototype.sendPasswordReset = jest.fn().mockResolvedValue();

    // Mock console.log to prevent output during test
    console.log = jest.fn();

    // Mock res object
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status function
      json: jest.fn() // Mock json function
    };

    // Send request to signUpController.signUp()
    await signUpController.signUp(req, res, jest.fn());

    // Assert that a new user is created and activation email is sent
    expect(User.findOne).toHaveBeenCalled(); // Ensure User.findOne() is called to check for existing user
    expect(User.prototype.save).toHaveBeenCalled(); // Ensure new user is saved
    expect(Email.prototype.sendPasswordReset).toHaveBeenCalled(); // Ensure activation email is sent
    expect(res.status).toHaveBeenCalledWith(201); // Ensure status is set to 201 (Created)
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: expect.any(String) // Ensure some activation token is returned in the response
    });
  }),
  it('should handle invalid file types', async () => {
    const req = {
      files: {
        profilePhoto: { mimetype: 'text/plain' }, // Invalid profile photo
        idPhoto: { mimetype: 'text/plain' } // Invalid ID photo
      },
      body: {
        data: JSON.stringify({
          email: 'test@example.com', // Example email
        })
      }
    };
    // Mock next function
    const next = jest.fn();
    await signUpController.signUp(req, {}, next);
    expect(next).toHaveBeenCalledWith(new APIError("Please a Proper Profile Photo", 400));
    expect(next).toHaveBeenCalledWith(new APIError("Please a Proper ID Photo", 400));
  });
});
