const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
  isbn: String,
  titre: String,
  auteur: String,
  editeur: String,
  anneePublication: Number,
  langue: String,
  description: String,
  imageCouverture: String,
  categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }
});

module.exports = mongoose.model('Livre', livreSchema);
