const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "clients",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    resource_type: "image",
     transformation: [
      { width: 800, height: 800, crop: "limit" },
      { quality: "auto" }
    ]
  }
});

const upload = multer({ storage });

module.exports = upload;


// This:

// Resizes to max 800px

// Auto compresses

// Upload becomes MUCH faster