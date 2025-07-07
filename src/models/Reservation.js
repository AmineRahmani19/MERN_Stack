const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' },
  idExemplaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Exemplaire' },
  dateReservation: Date,
  dateExpiration: Date,
  statutReservation: String,
  priorite: Number
});

module.exports = mongoose.model('Reservation', reservationSchema);
