const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
  nomCategorie: String,
  descriptionCategorie: String,
  codeClassification: String
});

module.exports = mongoose.model('Categorie', categorieSchema);
