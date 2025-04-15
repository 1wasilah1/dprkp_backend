const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: String,             
  description: String,        
  tabs: [
    {
      title: String,
      description: String,
      image: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
