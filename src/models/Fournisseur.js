const mongoose = require('mongoose');
const utilisateurSchema = require('./Utilisateur').schema;

const fournisseurSchema = new mongoose.Schema({
  ...utilisateurSchema.obj,
  nomEntreprise: String,
  siret: String,
  adresseEntreprise: String,
  contactPrincipal: String
});

module.exports = mongoose.model('Fournisseur', fournisseurSchema);
