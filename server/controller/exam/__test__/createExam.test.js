// const request = require('supertest');
const app = require('../../../app');  // Your Express app
const mongoose = require('mongoose');

describe('POST /exams', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  it('should create a new exam', async () => {
    const newExam = {
      title: 'Sample Exam',
      description: 'This is a sample exam.',
      date: '2024-06-02T10:00:00.000Z',
      duration: 60,
      questions: [
        {
          questionText: 'What is 2 + 2?',
          options: ['2', '3', '4', '5'],
          correctAnswer: '4'
        }
      ]
    };

    const response = await request(app)
      .post('/api/exams')
      .send(newExam)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(newExam.title);
    expect(response.body.description).toBe(newExam.description);
    expect(response.body.date).toBe(newExam.date);
    expect(response.body.duration).toBe(newExam.duration);
    expect(response.body.questions).toEqual(expect.arrayContaining(newExam.questions));
  });

  it('should return 400 if required fields are missing', async () => {
    const incompleteExam = {
      description: 'This is a sample exam without a title.'
      // Missing other required fields
    };

    const response = await request(app)
      .post('/api/exams')
      .send(incompleteExam)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });
});
