const mongoose = require('mongoose');

const amendeSchema = new mongoose.Schema({
  idPret: { type: mongoose.Schema.Types.ObjectId, ref: 'Pret' },
  idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' },
  montant: Number,
  motif: String,
  dateCreationAmende: Date,
  datePaiement: Date,
  statutAmende: String
});

module.exports = mongoose.model('Amende', amendeSchema);
