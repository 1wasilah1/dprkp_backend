const mongoose = require('mongoose');

const sopPPIDSchema = new mongoose.Schema({
  id_dokumen: { type: String, required: true, unique: true },
  nama_dokumen: { type: String, required: true },
  file_path: { type: String, required: true },
  original_name: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  created_at: { type: Date, default: Date.now }
});

const SOPPPIDDokumen = mongoose.model('SOPPPIDDokumen', sopPPIDSchema);

module.exports = SOPPPIDDokumen;
