const { StatusCodes } = require("http-status-codes");
const Organization = require("../../../models/organization.model");
const APIError = require("../../../utils/apiError");
const Notification = require("../../../models/notification.model");
const OrganizationExaminer = require("../../../models/organization.examiner.model");
const { joinOrganization } = require("../joinOrganization");

jest.mock("../../../models/organization.model");
jest.mock("../../../utils/apiError");
jest.mock("../../../models/notification.model");
jest.mock("../../../models/organization.examiner.model");

describe("joinOrganization", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: { id: "organizationId" },
      user: { id: "userId" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return an error if the organization is not found", async () => {
    Organization.findOne.mockResolvedValueOnce(null);

    await joinOrganization(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new APIError("Organization not found", StatusCodes.BAD_REQUEST)
    );
  });

  it("should return an error if the user is the admin of the organization", async () => {
    const organization = { adminUser: req.user.id };
    Organization.findOne.mockResolvedValueOnce(organization);

    await joinOrganization(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new APIError(
        "You are the admin of this organization",
        StatusCodes.BAD_REQUEST
      )
    );
  });
  it("should return an error if the user is already a member or has requested to join", async () => {
    const organization = { adminUser: "anotherUserId" };
    Organization.findOne.mockResolvedValueOnce(organization);
    OrganizationExaminer.findOne.mockResolvedValueOnce(null);
  
    await joinOrganization(req, res, next);
  
    expect(next).toHaveBeenCalledWith(
      new APIError(
        "You are already a member of this organization or have requested to be so.",
        StatusCodes.BAD_REQUEST
      )
    );
  });
});