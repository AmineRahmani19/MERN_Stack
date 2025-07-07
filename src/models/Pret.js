const mongoose = require('mongoose');

const pretSchema = new mongoose.Schema({
  idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' },
  idExemplaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Exemplaire' },
  idEmploye: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe' },
  dateEmprunt: Date,
  dateRetourPrevue: Date,
  dateRetourEffective: Date,
  statutPret: String // en cours, retourné, en retard, perdu
});

module.exports = mongoose.model('Pret', pretSchema);
