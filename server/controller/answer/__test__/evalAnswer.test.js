const UserAnswer = require("../../../models/user.answer.model");
const factory = require(".././../handlerFactory");
const { evaluateUserAnswer } = require("../evaluateUserAnswer");

// Mock the factory.createMany method
jest.mock(".././../handlerFactory", () => ({
  createMany: jest.fn().mockReturnValue(jest.fn()),
}));

describe("evaluateUserAnswer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.createMany with the correct arguments", () => {
    evaluateUserAnswer();

    expect(factory.createMany).toHaveBeenCalledWith(UserAnswer);
  });

  it("should return the result of factory.createMany", () => {
    const mockCreateMany = jest.fn();
    factory.createMany.mockReturnValueOnce(mockCreateMany);

    const result = evaluateUserAnswer();

    expect(result).toBe(mockCreateMany);
  });
});