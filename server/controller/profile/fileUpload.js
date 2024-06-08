
const path = require("path");
const catchAsync = require("./../../utils/catchAsync");

const fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const APIError = require("../../utils/APIError");
const { CLIENT_RENEG_LIMIT } = require("tls");

const fileUpload =
  // new args
  // name for the file
  // path for the file
  // maxSize

  async ({ file, name, filePath, maxSize }) => {
    if (!file) {
      // return next(new APIError("Please provide a photo", 404));
      return new APIError("Please provide a file", 404);
    }

    if (file.size > maxSize) {
      // return next(
      //   new APIError(`Please upload image smaller than` + {maxSize}, StatusCodes.BAD_REQUEST) // );
      return new APIError(
        `Please upload file smaller than ${maxSize}`,
        StatusCodes.BAD_REQUEST
      );
    }

    const newFileName = name + path.extname(file.name); // You can generate a new name however you like

    const imagePath = path.join(
      __dirname,
      `../../public/uploads/` + `${filePath}/` + `${newFileName}`
    );

    // if directory does not exist create it
    if (
      !fs.existsSync(
        path.join(__dirname, `../../public/uploads/` + `${filePath}/`)
      )
    ) {
      fs.mkdirSync(
        path.join(__dirname, `../../public/uploads/` + `${filePath}/`)
      );
    }

    await file.mv(imagePath);

    return `/uploads/` + `${filePath}/` + `${newFileName}`;
  };
// const uploadProductImage = async (req, res) => {
//   const result = await cloudinary.uploader.upload(
//     req.files.image.tempFilePath,
//     {
//       use_filename: true,
//       folder: 'file-upload',

//     }
//     console.log("upp")
//     const newFileName = name + path.extname(file.name); // You can generate a new name however you like

//     const imagePath = path.join(
//       __dirname,
//       `../../public/uploads/` + `${filePath}/` + `${newFileName}`
//     );
//     await file.mv(imagePath);
    
//     return `/uploads/` + `${filePath}/` + `${newFileName}`;
//   };




// // const uploadProductImage = async (req, res) => {
// //   const result = await cloudinary.uploader.upload(
// //     req.files.image.tempFilePath,
// //     {
// //       use_filename: true,
// //       folder: 'file-upload',
// //     }
// //   );
// //   fs.unlinkSync(req.files.image.tempFilePath);
// //   return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
// // };

// module.exports = {
//   fileUpload,
// };
