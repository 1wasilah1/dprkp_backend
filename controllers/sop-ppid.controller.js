const fs = require('fs');
const path = require('path');
const SOPPPIDDokumen = require('../models/sop-ppid.model');

const sopPPIDUploadDokumen = async (req, res) => {
  const { id_dokumen, nama_dokumen } = req.body;
  const file = req.file;

  if (!id_dokumen || !nama_dokumen || !file) {
    return res.status(400).json({ message: 'Data dokumen tidak lengkap.' });
  }

  // Pindahkan file ke frontend Next.js
  const frontendPath = path.join(__dirname, '../../sop-ppid-frontend/public/doc/upload');
  const destPath = path.join(frontendPath, file.filename);
  fs.renameSync(file.path, destPath);

  try {
    const newDokumen = await SOPPPIDDokumen.create({
      id_dokumen,
      nama_dokumen,
      file_path: `/doc/upload/${file.filename}`,
      original_name: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    res.status(201).json({
      message: 'Dokumen berhasil disimpan dan dipindahkan.',
      data: newDokumen
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menyimpan dokumen ke database.', error: error.message });
  }
};

const sopPPIDGetAllDokumen = async (req, res) => {
  const data = await SOPPPIDDokumen.find().sort({ created_at: -1 });
  res.status(200).json({ data });
};
const sopPPIDDeleteDokumen = async (req, res) => {
    const { id } = req.params;
  
    try {
      const dokumen = await SOPPPIDDokumen.findOne({ id_dokumen: id });
  
      if (!dokumen) {
        return res.status(404).json({ message: 'Dokumen tidak ditemukan.' });
      }
  
      // Hapus file dari folder Next.js
      const filePath = path.join(__dirname, `../../sop-ppid-frontend/public${dokumen.file_path}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      // Hapus dari MongoDB
      await SOPPPIDDokumen.deleteOne({ id_dokumen: id });
  
      res.status(200).json({ message: 'Dokumen berhasil dihapus.' });
    } catch (err) {
      res.status(500).json({ message: 'Gagal menghapus dokumen.', error: err.message });
    }
  };
  
module.exports = {
  sopPPIDUploadDokumen,
  sopPPIDDeleteDokumen,
  sopPPIDGetAllDokumen
};
