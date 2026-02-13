const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "projects/files",
    resource_type: "auto", // IMPORTANT (for pdf, doc, zip, etc.)
  }
});

const upload = multer({ storage });

module.exports = upload;
