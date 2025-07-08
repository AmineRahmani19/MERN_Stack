const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  idUtilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etudiant',
    required: true
  },
  idExemplaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exemplaire',
    required: true
  },
  dateReservation: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateExpiration: {
    type: Date,
    required: true
  },
  statutReservation: {
    type: String,
    enum: ['active', 'expiree', 'annulee'],
    default: 'active',
    required: true
  },
  priorite: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
