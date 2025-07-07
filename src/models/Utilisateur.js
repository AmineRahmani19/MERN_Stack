const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true, required: true },
  motDePasse: { type: String, required: true },
  dateInscription: { type: Date, default: Date.now },
  statut: { type: String, enum: ['actif', 'inactif', 'suspendu'], default: 'actif' }
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
