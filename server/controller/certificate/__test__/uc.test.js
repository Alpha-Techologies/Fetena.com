const Certificate = require("../../../models/certificate.model");
const factory = require(".././../handlerFactory");
const { updateCertificate } = require("../updateCertificate");

jest.mock(".././../handlerFactory", () => ({
  updateOne: jest.fn().mockReturnValue(jest.fn()),
}));

describe("updateQuestion", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.updateOne with the correct arguments", () => {
    updateQuestion();

    expect(factory.updateOne).toHaveBeenCalledWith(Question);
  });

  it("should return the result of factory.updateOne", () => {
    const mockUpdateOne = jest.fn();
    factory.updateOne.mockReturnValueOnce(mockUpdateOne);

    const result = updateQuestion();

    expect(result).toBe(mockUpdateOne);
  });
});