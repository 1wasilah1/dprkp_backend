
const mongoose = require("mongoose");

const taxItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaxItem", taxItemSchema);
