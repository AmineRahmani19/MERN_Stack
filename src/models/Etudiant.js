const mongoose = require('mongoose');
const utilisateurSchema = require('./Utilisateur').schema;

const etudiantSchema = new mongoose.Schema({
  ...utilisateurSchema.obj,
  numeroEtudiant: String,
  filiere: String,
  niveauEtude: String,
  maxEmprunts: { type: Number, default: 3 }
});

module.exports = mongoose.model('Etudiant', etudiantSchema);
