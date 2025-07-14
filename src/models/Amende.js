const mongoose = require('mongoose');

const amendeSchema = new mongoose.Schema({
  idPret: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pret',
    required: true
  },
  idUtilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  montant: {
    type: Number,
    required: true,
    min: 0
  },
  motif: {
    type: String,
    trim: true,
    required: true
  },
  dateCreationAmende: {
    type: Date,
    required: true,
    default: Date.now
  },
  datePaiement: {
    type: Date
  },
  statutAmende: {
    type: String,
    enum: ['impayee', 'payee', 'annulee'],
    default: 'impayee',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Amende', amendeSchema);
