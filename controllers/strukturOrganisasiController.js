const StrukturOrganisasi = require('../models/StrukturOrganisasi');

// POST - Simpan struktur
exports.createStrukturOrganisasi = async (req, res) => {
  try {
    const struktur = new StrukturOrganisasi({ data: req.body });
    const saved = await struktur.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error saving struktur', error: err });
  }
};

// GET - Ambil semua struktur
exports.getAllStrukturOrganisasi = async (req, res) => {
  try {
    const data = await StrukturOrganisasi.find();
    const result = data.map(item => ({
      _id: item._id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      data: item.data
    }));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching struktur', error: err });
  }
};

// GET - Ambil struktur berdasarkan ID
exports.getStrukturOrganisasiById = async (req, res) => {
  try {
    const item = await StrukturOrganisasi.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'StrukturOrganisasi not found' });

    const result = {
      _id: item._id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      data: item.data
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching struktur by ID', error: err });
  }
};

// PUT - Update struktur berdasarkan ID
exports.updateStrukturOrganisasi = async (req, res) => {
  try {
    const updated = await StrukturOrganisasi.findByIdAndUpdate(
      req.params.id,
      { data: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'StrukturOrganisasi not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating struktur', error: err });
  }
};

// DELETE - Hapus struktur berdasarkan ID
exports.deleteStrukturOrganisasi = async (req, res) => {
  try {
    const deleted = await StrukturOrganisasi.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'StrukturOrganisasi not found' });
    res.status(200).json({ message: 'StrukturOrganisasi deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting struktur', error: err });
  }
};
