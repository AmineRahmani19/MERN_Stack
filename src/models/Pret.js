const mongoose = require('mongoose');

const pretSchema = new mongoose.Schema({
  idUtilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  idExemplaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exemplaire',
    required: true
  },
  idEmploye: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  dateEmprunt: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateRetourPrevue: {
    type: Date,
    required: true
  },
  dateRetourEffective: {
    type: Date,
    required: false
  },
  statutPret: {
    type: String,
    enum: ['en cours', 'retourne', 'en retard', 'perdu'],
    default: 'en cours',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pret', pretSchema);
