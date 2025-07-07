const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  message: String,
  typeNotification: String,
  dateEnvoi: Date,
  statutNotification: String,
  lienEntite: String // id lié (prêt, réservation, etc.)
});

module.exports = mongoose.model('Notification', notificationSchema);
