
const factory = require('.././../handlerFactory');
const Exam = require('../../../models/exam.model');
const APIError = require('../../../utils/apiError')
const {deleteExam} = require('../deleteExam');


jest.mock('../../../models/exam.model', () => ({
//   deleteOne: jest.fn(),
findByIdAndDelete: jest.fn(),
}));
jest.mock('../../../utils/apiError');

describe('deleteExam', () => {
//   const { deleteExam } = require('../deleteExam');
// const deleteExam = factory.deleteOne(Exam)

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete the document', async () => {
    Exam.findByIdAndDelete.mockResolvedValue(true);

    const mockReq = {
      params: { id: '123' }, 
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();


    await deleteExam(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      data: null,
    });
  })
});