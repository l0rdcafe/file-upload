const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("img"), (req, res) => {
  if (!req.file) {
    return res.status(422).json({ error: "File not provided" });
  }

  res.status(200).json({ filename: req.file.originalname, size: req.file.size });
});

module.exports = router;
