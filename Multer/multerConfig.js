const multer = require("multer");
const upload = multer({

  dest:"Utils/"
});

module.exports = upload;
