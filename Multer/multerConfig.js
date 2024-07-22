const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    console.log("file original name is", file.originalname);
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
