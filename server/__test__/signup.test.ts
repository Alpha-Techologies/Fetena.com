import User from '../models/user.model';

describe('User Model', () => {
  describe('Creating a User', () => {
    test('should create a user with valid data', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: 1234567890,
        password: 'password123',
        passwordConfirm: 'password123',
        role: 'user',
      };

      const newUser = new User(userData);
      await expect(newUser.save()).resolves.toBeDefined();
    });

    // Add more test cases to cover scenarios such as missing required fields, invalid email format, etc.
  });

  describe('Validating Password', () => {
    test('should return true for correct password', async () => {
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      });
      await user.save();

      const isCorrectPassword = await user.correctPassword('password123', user.password);
      expect(isCorrectPassword).toBe(true);
    });

    // Add more test cases to cover scenarios such as incorrect password, password hashing, etc.
  });

  // Add more test suites to cover other methods and functionalities of the User model
});
