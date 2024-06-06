const UserAnswer = require("../../../models/user.answer.model");
const factory = require(".././../handlerFactory");
const { getOneUserAnswer } = require("../getOneUserAnswer");

// Mock the factory.getOne method
jest.mock(".././../handlerFactory", () => ({
  getOne: jest.fn().mockReturnValue(jest.fn()),
}));

describe("getOneUserAnswer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.getOne with the correct arguments", () => {
    getOneUserAnswer();

    expect(factory.getOne).toHaveBeenCalledWith(UserAnswer);
  });

  it("should return the result of factory.getOne", () => {
    const mockGetOne = jest.fn();
    factory.getOne.mockReturnValueOnce(mockGetOne);

    const result = getOneUserAnswer();

    expect(result).toBe(mockGetOne);
  });
});