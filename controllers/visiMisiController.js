const fs = require("fs");
const path = require("path");
// const Upload = require("../models/VisiMisiModel");
const VisiMisi = require("../models/VisiMisiModel");

const moveToFolder = (file) => {
  const newPath = path.join("visi-misi/public/doc/upload", file.filename);
  fs.renameSync(file.path, newPath);
  return newPath; // Return relative path to store in DB
};

// CREATE - Menambahkan visi misi
const createVisiMisi = async (req, res) => {
  const { visi, misi, type_visi_misi } = req.body;
  const files = req.file;

  if (!files.visi_image || !files.misi_image || !files.visi_misi_banner) {
    return res.status(400).json({ error: "All three images are required." });
  }

  const image1Path = moveToFolder(files.visi_image[0]);
  const image2Path = moveToFolder(files.misi_image[0]);
  const image3Path = moveToFolder(files.visi_misi_banner[0]);

  // // Pindahkan file ke frontend Next.js
  // const frontendPath = path.join(
  //   __dirname,
  //   "../../visi-misi/public/doc/upload"
  // );
  // const destPath = path.join(frontendPath, file.filename);
  // fs.renameSync(file.path, destPath);

  try {
    const newDokumen = await VisiMisi.createVisiMisi({
      visi,
      misi,
      type_visi_misi,
      visi_image: image1Path,
      misi_image: image2Path,
      visi_misi_banner: image3Path,
    });

    res.status(201).json({
      message: "Data Visi Misi berhasil dibuat",
      data: newDokumen,
    });

    // const visiMisi = await VisiMisi.createVisiMisi(req.body);
    // res.status(201).json(visiMisi);
  } catch (err) {
    res.status(500).json({ message: "Error saat membuat visi misi" });
  }
};

// READ - Mengambil data visi misi
const getVisiMisi = async (req, res) => {
  try {
    const visiMisi = await VisiMisi.getAllVisiMisi();
    res.status(200).json(visiMisi); // Mengirimkan data visi misi
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Database error 2",
      error: err.message,
    });
  }
};

// READ - Mengambil data visi misi berdasarkan type
const getVisiMisiByType = async (req, res) => {
  try {
    const visiMisi = await VisiMisi.getVisiMisiByType(req.params.id);
    res.status(200).json(visiMisi); // Mengirimkan data visi misi
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saat get data visi misi",
      error: err.message,
    });
  }
};

// UPDATE - Memperbarui data visi misi
const updateVisiMisi = async (req, res) => {
  try {
    const visiMisi = await VisiMisi.updateVisiMisi(req.body.id, req.body);
    if (visiMisi === 0)
      return res
        .status(404)
        .json({ message: "Data Visi Misi tidak ditemukan" });
    res.status(200).json("Data Visi Misi berhasil di perbaharui"); // Mengirimkan data visi misi yang diperbarui
  } catch (err) {
    res.status(500).json({ message: "Error saat memperbarui visi misi" }); //kondisi saat data gagal diupdate
  }
};

// Delete Visi Misi
const deleteVisiMisi = async (req, res) => {
  try {
    const visiMisi = await VisiMisi.findByIdAndDelete(req.params.id);
    if (!visiMisi) {
      return res
        .status(404)
        .json({ message: "Data Visi Misi tidak ditemukan" });
    }
    res.status(200).json({ message: "Data Visi Misi berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createVisiMisi,
  getVisiMisi,
  getVisiMisiByType,
  updateVisiMisi,
  deleteVisiMisi,
};
