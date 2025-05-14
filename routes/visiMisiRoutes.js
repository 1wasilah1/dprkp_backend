const express = require('express');
// const multer = require('multer');
const {
  getVisiMisi,
  getVisiMisiByType,
  createVisiMisi,
  updateVisiMisi,
} = require("../controllers/visiMisiController");

const router = express.Router();

// Route untuk mengambil data visi misi
router.get("/", getVisiMisi);

// Route untuk mengambil data visi misi
router.get("/:id", getVisiMisiByType);

// Route untuk menambahkan visi misi baru
router.post("/", createVisiMisi);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'visi-misi/images/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ storage: storage });

// router.post('/', upload.single('file'), uploadFile);

// Route untuk memperbarui visi misi
router.put("/", updateVisiMisi);

module.exports = router;