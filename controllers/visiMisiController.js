const VisiMisi = require("../models/VisiMisiModel");

// CREATE - Menambahkan visi misi
const createVisiMisi = async (req, res) => {
  try {
    const visiMisi = await VisiMisi.createVisiMisi(req.body);
    res.status(201).json(visiMisi);

    // const visiMisi = await VisiMisi.createVisiMisi(req.body);
    // const newVisiMisi = new VisiMisi({
    //   visi,
    //   misi,
    //   message: 'Data Visi Misi berhasil dibuat'
    // });

    // const savedVisiMisi = await newVisiMisi.save();
    // res.status(201).json(savedVisiMisi).send(visiMisi);

    // const savedVisiMisi = await newVisiMisi.save();
    // res.status(201).json(savedVisiMisi); // Mengirimkan data visi misi yang baru dibuat
  } catch (err) {
    res.status(500).json({ message: "Error saat membuat visi misi" });
  }
};

// READ - Mengambil data visi misi
const getVisiMisi = async (req, res) => {
  try {
    console.log('masuk controller getvisi =>')
    const visiMisi = await VisiMisi.getAllVisiMisi();
    console.log('masuk visiMisi =>', visiMisi)
    res.status(200).json(visiMisi); // Mengirimkan data visi misi
  } catch (err) {
    console.log('masuk 2', err)

    res.status(500).json({ success: false, message: 'Database error 2', error: err.message });
  }
};

// READ - Mengambil data visi misi berdasarkan type
const getVisiMisiByType = async (req, res) => {
  try {
    console.log('isi req body getVisiMisiByType=>', req)
    const visiMisi = await VisiMisi.getVisiMisiByType(req.params.id);
    console.log('masuk getVisiMisiByType =>', visiMisi)
    res.status(200).json(visiMisi); // Mengirimkan data visi misi
  } catch (err) {
    console.log('getVisiMisiByType err->', err)

    res.status(500).json({ success: false, message: 'Error saat get data visi misi', error: err.message });
  }
};

// UPDATE - Memperbarui data visi misi
const updateVisiMisi = async (req, res) => {
  try {
    const visiMisi = await VisiMisi.updateVisiMisi(req.body.id, req.body);

    if (visiMisi === 0) return res.status(404).json({ message: "Data Visi Misi tidak ditemukan" });

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
