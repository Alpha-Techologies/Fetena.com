const factory = require('.././../handlerFactory');
const organization = require('../../../models/organization.model');
const APIError = require('../../../utils/apiError');
const { getOneOrganization, getAllOrganization } = require('../getOrganization');

// Mock factory functions
jest.mock('.././../handlerFactory', () => ({
  getOne: jest.fn(() => jest.fn(async (req, res, next) => {
    if (req.params.id === '123') {
      return res.status(200).json({
        status: 'success',
        data: {
          organization: { id: '123', name: 'Test Organization' }
        }
      });
    } else {
      return next('No organization found with that ID', 404);
    }
  })),
  getAll: jest.fn(() => jest.fn(async (req, res, next) => {
    return res.status(200).json({
      status: 'success',
      results: 2,
      data: {
        organizations: [
          { id: '123', name: 'Test Organization 1' },
          { id: '456', name: 'Test Organization 2' }
        ]
      }
    });
  })),
}));

jest.mock('../../../models/organization.model');
jest.mock('../../../utils/apiError');

describe('getOneOrganization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return the organization if it exists', async () => {
    const mockReq = {
      params: { id: '123' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    await getOneOrganization(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        organization: { id: '123', name: 'Test Organization' }
      }
    });
    
  });

  it('should fetch and return all organizations', async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    await getAllOrganization(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      results: 2,
      data: {
        organizations: [
          { id: '123', name: 'Test Organization 1' },
          { id: '456', name: 'Test Organization 2' }
        ]
      }
    });
  });
});