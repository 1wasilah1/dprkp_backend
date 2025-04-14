
const TaxItem = require("../models/TaxItem");

// CREATE - Menambahkan item pajak baru
const createTaxItem = async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const newTaxItem = new TaxItem({
      title,
      description,
      icon
    });

    const savedTaxItem = await newTaxItem.save();
    res.status(201).json(savedTaxItem); // Mengirimkan item pajak yang baru dibuat
  } catch (err) {
    res.status(500).json({ message: "Error saat menambahkan item pajak" });
  }
};

// READ - Mengambil semua item pajak
const getAllTaxItems = async (req, res) => {
  try {
    const taxItems = await TaxItem.find(); // Mengambil data dari MongoDB
    res.status(200).json(taxItems); // Mengirimkan data item pajak
  } catch (err) {
    res.status(500).json({ message: "Error saat mengambil item pajak" });
  }
};

// READ - Mengambil item pajak berdasarkan ID
const getTaxItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const taxItem = await TaxItem.findById(id); // Mengambil item pajak berdasarkan ID
    if (!taxItem) {
      return res.status(404).json({ message: "Item pajak tidak ditemukan" });
    }
    res.status(200).json(taxItem);
  } catch (err) {
    res.status(500).json({ message: "Error saat mengambil item pajak" });
  }
};

// UPDATE - Memperbarui item pajak berdasarkan ID
const updateTaxItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon } = req.body;
    
    const updatedTaxItem = await TaxItem.findByIdAndUpdate(
      id,
      { title, description, icon },
      { new: true } // Mengembalikan data yang baru diperbarui
    );

    if (!updatedTaxItem) {
      return res.status(404).json({ message: "Item pajak tidak ditemukan" });
    }

    res.status(200).json(updatedTaxItem); // Mengirimkan item pajak yang diperbarui
  } catch (err) {
    res.status(500).json({ message: "Error saat memperbarui item pajak" });
  }
};

// DELETE - Menghapus item pajak berdasarkan ID
const deleteTaxItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTaxItem = await TaxItem.findByIdAndDelete(id); // Menghapus item pajak berdasarkan ID

    if (!deletedTaxItem) {
      return res.status(404).json({ message: "Item pajak tidak ditemukan" });
    }

    res.status(200).json({ message: "Item pajak berhasil dihapus" }); // Mengirimkan respons sukses
  } catch (err) {
    res.status(500).json({ message: "Error saat menghapus item pajak" });
  }
};

module.exports = {
  createTaxItem,
  getAllTaxItems,
  getTaxItemById,
  updateTaxItem,
  deleteTaxItem
};
