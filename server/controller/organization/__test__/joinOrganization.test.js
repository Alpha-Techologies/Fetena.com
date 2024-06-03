const { StatusCodes } = require("http-status-codes");
const Organization = require("../../../models/organization.model");
const APIError = require("../../../utils/apiError");
const catchAsync = require("../../../utils/catchAsync"); 
const Notification = require("../../../models/notification.model");
const OrganizationExaminer = require("../../../models/organization.examiner.model");
const  {joinOrganization}  = require("../joinOrganization"); 

// Mock your models and dependencies
jest.mock("../../../models/organization.model");
jest.mock("../../../models/notification.model");
jest.mock("../../../models/organization.examiner.model");
jest.mock("../../../utils/catchAsync"); 

describe('joinOrganization', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      params: { id: 'testOrgId' },
      user: { id: 'testUserId' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();

    jest.clearAllMocks();
  });

  it('should return an error if organization is not found', async () => {
    Organization.findOne.mockResolvedValue(null); 

    await joinOrganization(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new APIError("Organization not found", StatusCodes.BAD_REQUEST));
  });

  it('should return an error if user is the admin', async () => {
    Organization.findOne.mockResolvedValue({ 
      _id: 'testOrgId', 
      adminUser: 'testUserId' 
    });

    await joinOrganization(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new APIError("You are the admin of this organization", StatusCodes.BAD_REQUEST));
  });

  it('should return an error if user is already a member or has requested', async () => {
    Organization.findOne.mockResolvedValue({ _id: 'testOrgId', adminUser: 'differentAdminId' });
    OrganizationExaminer.findOne.mockResolvedValue({});

    await joinOrganization(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new APIError("You are already a member of this organization or have requested to be so.", StatusCodes.BAD_REQUEST));
  });

  it('should successfully create a join request and send a notification', async () => {
    Organization.findOne.mockResolvedValue({ 
      _id: 'testOrgId', 
      adminUser: 'differentAdminId' 
    });
    OrganizationExaminer.findOne.mockResolvedValue(null);
    OrganizationExaminer.create.mockResolvedValue({});
    Notification.create.mockResolvedValue({});

    await joinOrganization(mockReq, mockRes, mockNext);

    expect(OrganizationExaminer.create).toHaveBeenCalledWith({
      user: 'testUserId',
      organization: 'testOrgId',
    });

    expect(Notification.create).toHaveBeenCalledWith({
      user: 'differentAdminId', 
      message: expect.stringContaining('testUserId') 
    });

    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: "success",
      message: expect.any(String)
    });
  });
});

