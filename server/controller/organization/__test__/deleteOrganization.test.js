
const factory = require('.././../handlerFactory');
const organization = require('../../../models/organization.model');
const APIError = require('../../../utils/apiError')
const {deleteOrganization} = require('../deleteOrganization');


jest.mock('../../../models/organization.model', () => ({
//   deleteOne: jest.fn(),
findByIdAndDelete: jest.fn(),
}));
jest.mock('../../../utils/apiError');

describe('deleteOrganization', () => {
//   const { deleteExam } = require('../deleteExam');
// const deleteExam = factory.deleteOne(Exam)

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete the organization', async () => {
    organization.findByIdAndDelete.mockResolvedValue(true);

    const mockReq = {
      params: { id: '123' }, 
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();


    await deleteOrganization(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: null,
    });
  })
});