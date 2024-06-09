const Certificate = require("../../../models/certificate.model");
const factory = require(".././../handlerFactory");
const { getOneCertificate, getAllCertificate } = require("../getCertificate");

// Mock the factory.getOne and factory.getAll methods
jest.mock(".././../handlerFactory", () => ({
  getOne: jest.fn().mockReturnValue(jest.fn()),
  getAll: jest.fn().mockReturnValue(jest.fn()),
}));

describe("getOneQuestion", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.getOne with the correct arguments", () => {
    getOneQuestion();

    expect(factory.getOne).toHaveBeenCalledWith(Question);
  });

  it("should return the result of factory.getOne", () => {
    const mockGetOne = jest.fn();
    factory.getOne.mockReturnValueOnce(mockGetOne);

    const result = getOneQuestion();

    expect(result).toBe(mockGetOne);
  });
});

describe("getAllQuestion", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.getAll with the correct arguments", () => {
    getAllQuestion();

    expect(factory.getAll).toHaveBeenCalledWith(Question);
  });

  it("should return the result of factory.getAll", () => {
    const mockGetAll = jest.fn();
    factory.getAll.mockReturnValueOnce(mockGetAll);

    const result = getAllQuestion();

    expect(result).toBe(mockGetAll);
  });
});