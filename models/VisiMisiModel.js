
const mongoose = require("mongoose");

const visiMisiSchema = new mongoose.Schema(
  {
    visi: { type: String, required: true },
    misi: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisiMisi", visiMisiSchema);
