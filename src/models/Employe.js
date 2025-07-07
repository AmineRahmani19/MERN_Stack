const mongoose = require('mongoose');
const utilisateurSchema = require('./Utilisateur').schema;

const employeSchema = new mongoose.Schema({
  ...utilisateurSchema.obj,
  matricule: String,
  departement: String,
  roleEmploye: String
});

module.exports = mongoose.model('Employe', employeSchema);
