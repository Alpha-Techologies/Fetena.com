const UserAnswer = require("../../../models/user.answer.model");
const factory = require(".././../handlerFactory");
const { createUserAnswer } = require("../createUserAnswer");

// Mock the factory.createMany method
jest.mock(".././../handlerFactory", () => ({
  createMany: jest.fn().mockReturnValue(jest.fn()),
}));

describe("createUserAnswer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.createMany with the correct arguments", () => {
    createUserAnswer();

    expect(factory.createMany).toHaveBeenCalledWith(UserAnswer);
  });

  it("should return the result of factory.createMany", () => {
    const mockCreateMany = jest.fn();
    factory.createMany.mockReturnValueOnce(mockCreateMany);

    const result = createUserAnswer();

    expect(result).toBe(mockCreateMany);
  });
});