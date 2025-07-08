const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    required: true
  },
  prenom: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    trim: true,
    required: true
  },
  dateInscription: {
    type: Date,
    default: Date.now,
    required: true
  },
  statut: {
    type: String,
    trim: true,
    required: true,
    enum: ['actif', 'inactif', 'suspendu'],
    default: 'actif'
  }
}, {
  discriminatorKey: 'role', // clé de distinction entre les types
  timestamps: true
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);


