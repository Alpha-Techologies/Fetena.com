const request = require('supertest');
const express = require('express');
const sinon = require('sinon');

// Assume your routes are in 'routes/answerRoutes.js'
const answerRoutes = require('../answerRoutes');
const {
  getAllAnswer,
  createAnswer,
//   getOneAnswer,
  updateAnswer,
  deleteAnswer
} = require('../../controller/answer');

const app = express();
app.use(express.json());
app.use('/answers', answerRoutes);

describe('Answer Routes', () => {
  let getAllAnswerStub, createAnswerStub, getOneAnswerStub, updateAnswerStub, deleteAnswerStub;

  beforeAll(() => {
    // Override controller methods with mock implementations
    getAllAnswerStub = sinon.stub(getAllAnswer, 'getAllAnswer').callsFake((req, res) => {
      res.status(200).json([{ id: 1, text: 'Sample Answer' }]);
    });

    createAnswerStub = sinon.stub(createAnswer, 'createAnswer').callsFake((req, res) => {
      res.status(201).json({ id: 2, text: 'Created Answer' });
    });

    getOneAnswerStub = sinon.stub(getOneAnswer, 'getOneAnswer').callsFake((req, res) => {
      res.status(200).json({ id: req.params.id, text: 'Sample Answer' });
    });

    updateAnswerStub = sinon.stub(updateAnswer, 'updateAnswer').callsFake((req, res) => {
      res.status(200).json({ id: req.params.id, text: 'Updated Answer' });
    });

    deleteAnswerStub = sinon.stub(deleteAnswer, 'deleteAnswer').callsFake((req, res) => {
      res.status(204).end();
    });
  });

  afterAll(() => {
    sinon.restore();
  });

  it('should return all answers (GET /answers)', async () => {
    const res = await request(app).get('/answers');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('id', 1);
    expect(res.body[0]).toHaveProperty('text', 'Sample Answer');
  });

  it('should create a new answer (POST /answers)', async () => {
    const res = await request(app)
      .post('/answers')
      .send({ text: 'Created Answer' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', 2);
    expect(res.body).toHaveProperty('text', 'Created Answer');
  });

  it('should return a single answer (GET /answers/:id)', async () => {
    const res = await request(app).get('/answers/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('text', 'Sample Answer');
  });

  it('should update an answer (PUT /answers/:id)', async () => {
    const res = await request(app)
      .put('/answers/1')
      .send({ text: 'Updated Answer' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('text', 'Updated Answer');
  });

  it('should delete an answer (DELETE /answers/:id)', async () => {
    const res = await request(app).delete('/answers/1');
    expect(res.status).toBe(204);
  });
});