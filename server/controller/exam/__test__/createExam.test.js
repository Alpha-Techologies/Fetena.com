// __tests__/examController.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Exam = require('../../../models/exam.model');
const { createExam } = require('../createExam');

// Mocking the Mongoose model
jest.mock('../../../models/exam.model');

const app = express();
app.use(bodyParser.json());
app.post('/exams', createExam);

describe('Exam Controller - Create Exam', () => {
  beforeAll(() => {
    mongoose.connect = jest.fn(); // Prevent actual DB connection
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an exam successfully', async () => {
    const mockExam = {
      examName: 'Sample Exam',
      duration: 120,
      examKey: 'EXAM123',
      description: 'A sample exam description',
      privateAnswer: false,
      privateScore: false,
      toolsPermitted: ['Calculator', 'Notes'],
      invigilatorID: '60c72b2f5f1b2c001c8e4f7f',
      questions: ['60c72b2f5f1b2c001c8e4f80', '60c72b2f5f1b2c001c8e4f81'],
    };

    Exam.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({ ...mockExam, _id: 'mock-id' }),
    }));

    const response = await request(app)
      .post('/exams')
      .send(mockExam);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.exam.examName).toBe(mockExam.examName);
    expect(response.body.data.exam.duration).toBe(mockExam.duration);
    expect(response.body.data.exam.toolsPermitted).toEqual(mockExam.toolsPermitted);
  });

  it('should return 500 if exam creation fails', async () => {
    const mockExam = {
      examName: 'Sample Exam',
      duration: 120,
      examKey: 'EXAM123',
      description: 'A sample exam description',
      privateAnswer: false,
      privateScore: false,
      toolsPermitted: ['Calculator', 'Notes'],
      invigilatorID: '60c72b2f5f1b2c001c8e4f7f',
      questions: ['60c72b2f5f1b2c001c8e4f80', '60c72b2f5f1b2c001c8e4f81'],
    };

    Exam.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('Database error')),
    }));

    const response = await request(app)
      .post('/exams')
      .send(mockExam);

    expect(response.status).toBe(500);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Database error');
  });

  it('should return 400 if required fields are missing', async () => {
    const incompleteExam = {
      examName: 'Incomplete Exam',
      duration: 90,
    };

    const response = await request(app)
      .post('/exams')
      .send(incompleteExam);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });
});