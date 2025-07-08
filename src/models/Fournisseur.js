const mongoose = require('mongoose');
const Utilisateur = require('./Utilisateur');

const fournisseurSchema = new mongoose.Schema({
  
  nomEntreprise: {
    type: String,
    trim: true,
    required: true
  },
  siret: {
    type: String,
    trim: true,
    required: true,
    unique: true  
  },
  adresseEntreprise: {
    type: String,
    trim: true,
    required: true
  },
  contactPrincipal: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
});

module.exports = Utilisateur.discriminator('Fournisseur', fournisseurSchema);
