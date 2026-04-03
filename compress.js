const express = require("express");
const multer = require("multer");
const { compressVideo } = require("../controllers/logic");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/compress", upload.single("video"), compressVideo);

module.exports = router;