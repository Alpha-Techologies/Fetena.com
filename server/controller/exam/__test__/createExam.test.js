// tests/controllers/examController.test.js
const { StatusCodes } = require("http-status-codes");
const Exam = require("../../../models/exam.model");
const { createExam } = require("../createExam");
const generateRandomKey = require("../../../utils/generateRandomKey");

jest.mock("../../../models/exam.model");
jest.mock("../../../utils/generateRandomKey");

describe("createExam", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      files: {},
      body: {},
      user: { id: "mockUserId" }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    next = jest.fn();
    Exam.mockClear();
    generateRandomKey.mockClear();
  });

  it("should create an exam when valid data is provided", async () => {
    const examId = "mockExamId";
    const examKey = "mockExamKey";
    generateRandomKey.mockReturnValue(examKey);

    const mockExam = {
      _id: examId,
      title: "Mock Exam",
      createdBy: "mockUserId",
      invigilatorID: "mockUserId",
      examKey,
      save: jest.fn().mockResolvedValue({
        _id: examId,
        title: "Mock Exam",
        createdBy: "mockUserId",
        invigilatorID: "mockUserId",
        examKey
      })
    };

    Exam.mockImplementation(() => mockExam);

    req.body.data = JSON.stringify({
      title: "Mock Exam",
      createdBy: "mockUserId",
      invigilatorID: "mockInvigilatorId"
    });

    await createExam(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        exam: {
          _id: examId,
          title: "Mock Exam",
          createdBy: "mockUserId",
          invigilatorID: "mockUserId",
          examKey
        }
      }
    });
  });
});