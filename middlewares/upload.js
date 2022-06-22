const path = require("path");
const temp = path.join(__dirname, "../tmp");
const multer = require("multer");
const error = require("../error");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, temp);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(error(400, "Wrong format"));
    }
  },
  limits: { fieldNameSize: 10 },
});

module.exports = upload;
