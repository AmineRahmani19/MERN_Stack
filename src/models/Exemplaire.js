const mongoose = require('mongoose');

const exemplaireSchema = new mongoose.Schema({
  idLivre: { type: mongoose.Schema.Types.ObjectId, ref: 'Livre' },
  codeBarre: String,
  statutExemplaire: String, // disponible, emprunté, réservé, perdu, etc.
  localisation: String,
  dateAcquisition: Date,
  etat: String // neuf, bon, usagé, endommagé
});

module.exports = mongoose.model('Exemplaire', exemplaireSchema);
