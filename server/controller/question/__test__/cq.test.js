const Question = require("../../../models/question.model");
const factory = require(".././../handlerFactory");
const { createQuestion } = require("../createQuestion");

// Mock the factory.createMany method
jest.mock(".././../handlerFactory", () => ({
  createMany: jest.fn().mockReturnValue(jest.fn()),
}));

describe("createQuestion", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.createMany with the correct arguments", () => {
    createQuestion();

    expect(factory.createMany).toHaveBeenCalledWith(Question, true);
  });

//   it("should return the result of factory.createMany", () => {
//     const mockCreateMany = jest.fn();
//     factory.createMany.mockReturnValueOnce(mockCreateMany);

//     const result = createQuestion();

//     expect(result).toBe(mockCreateMany);
//   });
});