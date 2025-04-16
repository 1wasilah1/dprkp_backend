const mongoose = require('mongoose');

const StrukturOrganisasiSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('StrukturOrganisasi', StrukturOrganisasiSchema);
