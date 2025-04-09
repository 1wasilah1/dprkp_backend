const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String },
  icon: { type: String },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: null }
}, { timestamps: true });

module.exports = mongoose.models.Menu || mongoose.model('Menu', menuSchema);
