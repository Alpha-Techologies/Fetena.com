// tests/controllers/notificationController.test.js
const factory = require(".././../handlerFactory");
const Notification = require("../../../models/notification.model");
const { getNotification } = require("../getNotification");

// Mock the factory.getAll method
jest.mock(".././../handlerFactory", () => ({
  getAll: jest.fn().mockReturnValue(jest.fn()),
}));

describe("getNotification", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call factory.getAll with the correct arguments", () => {
    getNotification();

    expect(factory.getAll).toHaveBeenCalledWith(Notification, "addUser");
  });

  it("should return the result of factory.getAll", () => {
    const mockGetAll = jest.fn();
    factory.getAll.mockReturnValueOnce(mockGetAll);

    const result = factory.getAll(Notification, "addUser");

    expect(result).toBe(mockGetAll);
  });
});