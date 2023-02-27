const multer = require("multer");
const path = require("path");
const uploadDir = path.join(__dirname, "../temp");

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 20480000,
    },
});

const upload = multer({
    storage: multerConfig,
});

module.exports = upload;