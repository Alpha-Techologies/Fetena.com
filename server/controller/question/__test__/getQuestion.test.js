const factory = require('.././../handlerFactory');
const question = require('../../../models/question.model');
const APIError = require('../../../utils/apiError');
const { getOneQuestion, getAllQuestion } = require('../getQuestion');

// Mock factory functions
jest.mock('.././../handlerFactory', () => ({
  getOne: jest.fn(() => jest.fn(async (req, res, next) => {
    if (req.params.id === '123') {
      return res.status(200).json({
        status: 'success',
        data: {
            question: { id: '123', name: 'Test question' }
        }
      });
    } else {
      return next('No question found with that ID', 404);
    }
  })),
  getAll: jest.fn(() => jest.fn(async (req, res, next) => {
    return res.status(200).json({
      status: 'success',
      results: 2,
      data: {
        questions: [
          { id: '123', name: 'Test question 1' },
          { id: '456', name: 'Test question 2' }
        ]
      }
    });
  })),
}));

jest.mock('../../../models/question.model');
jest.mock('../../../utils/apiError');

describe('getOneQuestion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return the question if it exists', async () => {
    const mockReq = {
      params: { id: '123' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    await getOneQuestion(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        question: { id: '123', name: 'Test question' }
      }
    });
    
  });

  it('should fetch and return all question', async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    await getAllQuestion(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      results: 2,
      data: {
        questions: [
          { id: '123', name: 'Test question 1' },
          { id: '456', name: 'Test question 2' }
        ]
      }
    });
  });
}); 