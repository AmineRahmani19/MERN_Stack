const mongoose = require('mongoose');
const Utilisateur = require('./Utilisateur');

const etudiantSchema = new mongoose.Schema({
  numeroEtudiant: {
    type: Number,
    required: true
  },
  filiere: {
    type: String,
    trim: true,
    required: true
  },
  niveauEtude: {
    type: String,
    trim: true,
    required: true
  },
  maxEmprunts: {
    type: Number,
    default: 3,
    required: true
  }
}, {
  timestamps: true
});

module.exports = Utilisateur.discriminator('Etudiant', etudiantSchema);
