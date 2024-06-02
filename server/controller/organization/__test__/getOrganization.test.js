// Mock the factory methods
const factory = require('.././../handlerFactory');
jest.mock('.././../handlerFactory');

// Mock the Organization model
const Organization = require('../../../models/organization.model');
jest.mock('../../../models/organization.model');

describe('Organization Controller', () => {
  let getOneOrganization;
  let getAllOrganization;

  beforeEach(() => {
    // Reset the module registry before each test to ensure fresh imports
    jest.resetModules();
    factory.getOne = jest.fn();
    factory.getAll = jest.fn();

    // Dynamically import the functions after setting up mocks
    const organizationFunctions = require('../getOrganization');
    getOneOrganization = organizationFunctions.getOneOrganization;
    getAllOrganization = organizationFunctions.getAllOrganization;
  });

  describe('getOneOrganization', () => {
    it('should call factory.getOne with the Organization model', () => {
      // Trigger the function to check if factory.getOne was called
      getOneOrganization;

      // Test if factory.getOne was called with the Organization model
      expect(factory.getOne).toHaveBeenCalledWith(Organization);
    });
  });

  describe('getAllOrganization', () => {
    it('should call factory.getAll with the Organization model', () => {
      // Trigger the function to check if factory.getAll was called
      getAllOrganization;

      // Test if factory.getAll was called with the Organization model
      expect(factory.getAll).toHaveBeenCalledWith(Organization);
    });
  });
});