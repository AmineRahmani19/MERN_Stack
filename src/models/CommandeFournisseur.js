const mongoose = require('mongoose');

const commandeFournisseurSchema = new mongoose.Schema({
  idFournisseur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  idEmploye: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employe',
    required: true
  },
  dateCommande: {
    type: Date,
    required: true,
    default: Date.now
  },
  statutCommande: {
    type: String,
    enum: ['en attente', 'en cours', 'livree', 'annulee'],
    default: 'en attente',
    required: true
  },
  dateLivraisonPrevue: {
    type: Date,
    required: true
  },
  dateLivraisonEffective: {
    type: Date
  },
  montantTotal: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CommandeFournisseur', commandeFournisseurSchema);
