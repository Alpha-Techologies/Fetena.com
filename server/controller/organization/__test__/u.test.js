const factory = require(".././../handlerFactory");
const Organization = require("../../../models/organization.model");
const { updateOrganization } = require("../updateOrganization");

jest.mock(".././../handlerFactory", () => ({
  updateOne: jest.fn().mockReturnValue(jest.fn()),
}));

describe("updateOrganization", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.updateOne with the correct arguments", () => {
    updateOrganization();

    expect(factory.updateOne).toHaveBeenCalledWith(Organization);
  });

  it("should return the result of factory.updateOne", () => {
    const mockUpdateOne = jest.fn();
    factory.updateOne.mockReturnValueOnce(mockUpdateOne);

    const result = updateOrganization();

    expect(result).toBe(mockUpdateOne);
  });
});