const TakeExam = require("../../models/take.exam.model");
const APIError = require("../../utils/apiError");
const catchAsync = require("../../utils/catchAsync");
const { fileUpload } = require("../profile/fileUpload");

exports.faceaiDetection = catchAsync(async (req, res, next) => {
  // receive the file as a form data
  if (!req.files) {
    next(new APIError("Please upload a file", 400));
  }

  // get the take exam id from the req.body.data parsing the JSON
  const takeExamId = req.body.takeExamId;

  // get the take exam
  const takeExam = await TakeExam.findOne({ _id: takeExamId });

  if (!takeExam) {
    next(new APIError("Take Exam not found", 404));
  }

  const image = req.files.image;

  // check if it is image
  if (!image.mimetype.startsWith("image")) {
    next(new APIError("Please upload an image file", 400));
  }

  // upload the image to the server
  const saveImage = await fileUpload({
    file: image,
    name: `faceaiDetection_${takeExamId}_${Date.now()}`,
    filePath: "faceaiDetections",
    maxSize: 1024 * 1024 * 2,
  });

  // check if error
  if (saveImage instanceof Error) {
    next(saveImage);
  }

  // send the image url on the take exam instance
  takeExam.userActivityLogs.push({
    actionType: "warning",
    imageUrl: saveImage,
    action: "Face AI Detection",
    reason: "More that One Face Detected. Saved Image for Review",
  });

  await takeExam.save();

  res.status(200).json({
    status: "success",
    message: "Face AI Detection",
    data: null,
  });
});
