// authRouter.test.js
const express = require('express');
const request = require('supertest');
const router = require('../routes'); // Adjust the path to your router
const { validationRules } = require('../../controller/auth/protect');
const {
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controller/auth');

// Mock the controller functions
jest.mock('../controller/auth', () => ({
  forgotPassword: jest.fn((req, res) => res.status(200).json({ message: 'Forgot password' })),
  resetPassword: jest.fn((req, res) => res.status(200).json({ message: 'Reset password' })),
  updatePassword: jest.fn((req, res) => res.status(200).json({ message: 'Update password' })),
  validationRules: new Array(5).fill((req, res, next) => next()), // Mock your validation rules
}));

// Mock your protect middleware
const protect = jest.fn((req, res, next) => next());

jest.mock('../../controller/auth/protect', () => ({
  protect,
}));

const app = express();
app.use(express.json());
app.use('/api/users/auth', router);

describe('Auth Router', () => {
  it('should call forgotPassword controller on /api/v1/auth/forgotPassword POST', async () => {
    const response = await request(app)
      .post('/api/v1/auth/forgotPassword')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Forgot password');
    expect(forgotPassword).toHaveBeenCalled();
  });

  it('should call resetPassword controller on /api/v1/auth/resetPassword/:token POST', async () => {
    const response = await request(app)
      .post('/api/v1/auth/resetPassword/12345')
      .send({ newPassword: 'newPassword123' });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Reset password');
    expect(resetPassword).toHaveBeenCalled();
  });

  it('should call updatePassword controller on /api/v1/auth/updatePassword PATCH', async () => {
    const response = await request(app)
      .patch('/api/v1/auth/updatePassword')
      .send({ currentPassword: 'currentPass', newPassword: 'newPass123' });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Update password');
    expect(updatePassword).toHaveBeenCalled();
    expect(protect).toHaveBeenCalled();
  });
});