const mongoose = require('mongoose');
const Utilisateur = require('./Utilisateur');

// Étendre le schéma utilisateur
const employeSchema = new mongoose.Schema({

  matricule: {
    type: Number,
    required: true
  },
  departement: {
    type: String,
    trim: true,
    required: true
  },
  roleEmploye: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true 
});

module.exports = Utilisateur.discriminator('Employe', employeSchema);
