const express = require("express");
const {
  createTaxItem,
  getAllTaxItems,
  getTaxItemById,
  updateTaxItem,
  deleteTaxItem
} = require("../controllers/taxItemController");

const router = express.Router();

// Route untuk mengambil semua item pajak
router.get("/tax-items", getAllTaxItems);

// Route untuk mengambil item pajak berdasarkan ID
router.get("/tax-items/:id", getTaxItemById);

// Route untuk menambahkan item pajak baru
router.post("/tax-items", createTaxItem);

// Route untuk memperbarui item pajak berdasarkan ID
router.put("/tax-items/:id", updateTaxItem);

// Route untuk menghapus item pajak berdasarkan ID
router.delete("/tax-items/:id", deleteTaxItem);

module.exports = router;
