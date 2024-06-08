
const factory = require('.././../handlerFactory');
const Certificate = require('../../../models/certificate.model');
const APIError = require('../../../utils/apiError')
const {deleteCertificate} = require('../deleteCertificate');


jest.mock('../../../models/question.model', () => ({
//   deleteOne: jest.fn(),
findByIdAndDelete: jest.fn(),
}));
jest.mock('../../../utils/apiError');

describe('deleteQuestion', () => {
//   const { deleteExam } = require('../deleteExam');
// const deleteExam = factory.deleteOne(Exam)

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete the question', async () => {
    organization.findByIdAndDelete.mockResolvedValue(true);

    const mockReq = {
      params: { id: '123' }, 
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();


    await deleteQuestion(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: null,
    });
  })
});