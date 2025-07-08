const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  nomCategorie: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  descriptionCategorie: {
    type: String,
    trim: true,
    required: false
  },
  codeClassification: {
    type: String,
    trim: true,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Categorie', categorieSchema);
