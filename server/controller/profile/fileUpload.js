const path = require("path");
const catchAsync = require("./../../utils/catchAsync");

// const fs = require('fs');
const { StatusCodes } = require("http-status-codes");
const APIError = require("../../utils/apiError");

const fileUpload = catchAsync(async (req, res, next) => {
  if (!req.files) {
    return next(new APIError("There is no file", 404));
  }
  const profilePhoto = req.files.image;
  if (!profilePhoto.mimetype.startsWith("image")) {
    return next(new APIError("Please Upload Image", StatusCodes.BAD_REQUEST));
  }
  const maxSize = 1024 * 1024;
  // console.log("uploaded");
  if (profilePhoto.size > maxSize) {
    return next(
      new APIError("Please upload image smaller 1MB", StatusCodes.BAD_REQUEST)
    );
  }
  const imagePath = path.join(
    __dirname,
    "../../public/uploads/profiles/" + `${profilePhoto.name}`
  );
  await profilePhoto.mv(imagePath);
  return res
    .status(StatusCodes.OK)

    .json({ image: { src: `/uploads/${profilePhoto.name}` } });
});

// const uploadProductImage = async (req, res) => {
//   const result = await cloudinary.uploader.upload(
//     req.files.image.tempFilePath,
//     {
//       use_filename: true,
//       folder: 'file-upload',
//     }
//   );
//   fs.unlinkSync(req.files.image.tempFilePath);
//   return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
// };

module.exports = {
  fileUpload,
};
