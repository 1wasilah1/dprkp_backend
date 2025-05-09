const express = require("express");
const {
  getVisiMisi,
  getVisiMisiByType,
  createVisiMisi,
  updateVisiMisi
} = require("../controllers/visiMisiController");

const router = express.Router();

// Route untuk mengambil data visi misi
router.get("/", getVisiMisi);

// Route untuk mengambil data visi misi
router.get("/:id", getVisiMisiByType);

// Route untuk menambahkan visi misi baru
router.post("/", createVisiMisi);

// Route untuk memperbarui visi misi
router.put("/", updateVisiMisi);

module.exports = router;