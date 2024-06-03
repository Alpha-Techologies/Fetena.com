const UserAnswer = require("../../../models/user.answer.model");
const factory = require(".././../handlerFactory");
const { updateUserAnswer } = require("../updateUserAnswer");

// Mock the factory.updateOne method
jest.mock(".././../handlerFactory", () => ({
  updateOne: jest.fn().mockReturnValue(jest.fn()),
}));

describe("updateUserAnswer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.updateOne with the correct arguments", () => {
    updateUserAnswer();

    expect(factory.updateOne).toHaveBeenCalledWith(UserAnswer);
  });

  it("should return the result of factory.updateOne", () => {
    const mockUpdateOne = jest.fn();
    factory.updateOne.mockReturnValueOnce(mockUpdateOne);

    const result = updateUserAnswer();

    expect(result).toBe(mockUpdateOne);
  });
});