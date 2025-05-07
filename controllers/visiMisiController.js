const VisiMisi = require("../models/VisiMisiModel");

// CREATE - Menambahkan visi misi
const createVisiMisi = async (req, res) => {
  try {
    const { visi, misi } = req.body;
    const newVisiMisi = new VisiMisi({
      visi,
      misi,
    });

    const savedVisiMisi = await newVisiMisi.save();
    res.status(201).json(savedVisiMisi); // Mengirimkan data visi misi yang baru dibuat
  } catch (err) {
    res.status(500).json({ message: "Error saat membuat visi misi" });
  }
};

// READ - Mengambil data visi misi
const getVisiMisi = async (res) => {
  try {
    const visiMisi = await VisiMisi.find(); // Mengambil data dari MongoDB
    res.status(200).json(visiMisi); // Mengirimkan data visi misi
  } catch (err) {
    res.status(500).json({ message: "Error saat mengambil data Visi Misi" });
  }
};

// UPDATE - Memperbarui data visi misi
const updateVisiMisi = async (res) => {
  try {
    const updateVisiMisi = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updateVisiMisi); // Mengirimkan data visi misi yang diperbarui
  } catch (err) {
    res.status(500).json({ message: "Error saat memperbarui visi mis" });
  }
};

module.exports = {
  createVisiMisi,
  getVisiMisi,
  updateVisiMisi,
};
