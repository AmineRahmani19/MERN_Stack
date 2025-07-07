const mongoose = require('mongoose');

const ligneSchema = new mongoose.Schema({
  idCommandeFournisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'CommandeFournisseur' },
  idLivre: { type: mongoose.Schema.Types.ObjectId, ref: 'Livre' },
  quantite: Number,
  prixUnitaire: Number
});

module.exports = mongoose.model('LigneCommandeFournisseur', ligneSchema);
