const mongoose = require('mongoose');

const pretSchema = new mongoose.Schema({
  idUtilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  idExemplaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exemplaire',
    required: true
  },
  idEmploye: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },

  //date à laquelle l’utilisateur prend réellement le livre
  dateEmprunt: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateRetourPrevue: {
    type: Date,
    required: true
  },
  dateRetourEffective: {
    type: Date,
    required: false
  },
  statutPret: {
    type: String,
    enum: ['en attente','en cours', 'retourne', 'en retard', 'perdu'],
    default: 'en attente',  // demande d'emprunt non encore validée
    /*
    'en attente' = l’étudiant a demandé l’emprunt, mais l’employé n’a pas encore validé.

    'en cours' = prêt validé par l’employé.

    */
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pret', pretSchema);
