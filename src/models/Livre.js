const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
  isbn: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  titre: {
    type: String,
    trim: true,
    required: true
  },
  auteur: {
    type: String,
    trim: true,
    required: true
  },
  editeur: {
    type: String,
    trim: true,
    required: true
  },
  anneePublication: {
    type: Number,
    required: true
  },
  langue: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  imageCouverture: {
    type: String,
    trim: true,
    required: true
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Livre', livreSchema);
