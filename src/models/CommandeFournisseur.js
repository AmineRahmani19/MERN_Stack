const mongoose = require('mongoose');

const commandeFournisseurSchema = new mongoose.Schema({
  idFournisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur' },
  idEmploye: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe' },
  dateCommande: Date,
  statutCommande: String,
  dateLivraisonPrevue: Date,
  dateLivraisonEffective: Date,
  montantTotal: Number
});

module.exports = mongoose.model('CommandeFournisseur', commandeFournisseurSchema);
