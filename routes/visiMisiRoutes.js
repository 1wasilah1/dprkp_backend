const express = require("express");
const {
  getVisiMisi,
  createVisiMisi,
  updateVisiMisi
} = require("../controllers/visiMisiController");

const router = express.Router();

// Route untuk mengambil data visi misi
router.get("/visi-misi", getVisiMisi);

// Route untuk menambahkan visi misi baru
router.post("/visi-misi", createVisiMisi);

// Route untuk memperbarui visi misi
router.put("/visi-misi", updateVisiMisi);

module.exports = router;