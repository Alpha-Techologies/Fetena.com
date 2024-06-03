const factory = require(".././../handlerFactory");
const Organization = require("../../../models/organization.model");
const httpMocks = require('node-mocks-http');

// Mock the Organization model
jest.mock('../../../models/organization.model');

// Import the controller module
const {organizationController} = require('../updateOrganization');

// Mock the factory.updateOne function
jest.mock('.././../handlerFactory', () => ({
  updateOne: jest.fn(),
}));

describe('updateOrganization', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'PUT',
      url: '/api/users/organizations/1',
      params: {
        id: '1',
      },
      body: {
        name: 'Updated Organization',
      },
    });
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  test('should update an organization and return the updated document', async () => {
    const updatedOrg = { _id: '1', name: 'Updated Organization' };

    Organization.findByIdAndUpdate.mockResolvedValue(updatedOrg);

    // Mock the implementation of the factory function to call the actual implementation
    factory.updateOne.mockImplementation(() => async (req, res, next) => {
      const doc = await Organization.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return res.status(404).send({
          status: 'fail',
          message: 'No document found with that ID',
        });
      }

      res.status(200).send({
        status: 'success',
        data: {
          data: doc,
        },
      });
    });

    await organizationController.updateOrganization(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      status: 'success',
      data: {
        data: updatedOrg,
      },
    });
  });

  test('should return 404 if the organization is not found', async () => {
    Organization.findByIdAndUpdate.mockResolvedValue(null);

    await organizationController.updateOrganization(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({
      status: 'fail',
      message: 'No document found with that ID',
    });
  });

  test('should return 400 if there is an error', async () => {
    const errorMessage = 'This is a test error';
    Organization.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));

    await organizationController.updateOrganization(req, res, next);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      status: 'fail',
      message: errorMessage,
    });
  });
});
