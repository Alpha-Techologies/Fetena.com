const request = require('supertest');
const { app } = require('../app');

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@example.com',
      password: 'Password123'
    })
    .expect(201);
});