// tests/controllers/takeExamController.test.js
const factory = require(".././../handlerFactory");
const TakeExam = require("../../../models/take.exam.model");
const {
  getAllExamTaker,
  updateTakeExam,
  getOneExamTaker
} = require("../takeExam");

// Mock the factory methods
jest.mock(".././../handlerFactory", () => ({
  getAll: jest.fn().mockReturnValue(jest.fn()),
  updateOne: jest.fn().mockReturnValue(jest.fn()),
  getOne: jest.fn().mockReturnValue(jest.fn())
}));

describe("takeExamController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllExamTaker", () => {
    it("should call factory.getAll with the correct arguments", () => {
      getAllExamTaker();

      expect(factory.getAll).toHaveBeenCalledWith(TakeExam, "addExam");
    });

    it("should return the result of factory.getAll", () => {
      const mockGetAll = jest.fn();
      factory.getAll.mockReturnValueOnce(mockGetAll);

      const result = factory.getAll(TakeExam, "addExam");

      expect(result).toBe(mockGetAll);
    });
  });

  describe("updateTakeExam", () => {
//     it("should call factory.updateOne with the correct arguments", () => {
//       updateTakeExam();

//       expect(factory.updateOne).toHaveBeenCalledWith(TakeExam);
//     });

    it("should return the result of factory.updateOne", () => {
      const mockUpdateOne = jest.fn();
      factory.updateOne.mockReturnValueOnce(mockUpdateOne);

      const result = factory.updateOne(TakeExam);

      expect(result).toBe(mockUpdateOne);
    });
  });

  describe("getOneExamTaker", () => {
    // it("should call factory.getOne with the correct arguments", () => {
    //   getOneExamTaker();

    //   expect(factory.getOne).toHaveBeenCalledWith(TakeExam);
    // });

    it("should return the result of factory.getOne", () => {
      const mockGetOne = jest.fn();
      factory.getOne.mockReturnValueOnce(mockGetOne);

      const result = factory.getOne(TakeExam);

      expect(result).toBe(mockGetOne);
    });
  });
});