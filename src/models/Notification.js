const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  idUtilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  message: {
    type: String,
    trim: true,
    required: true
  },
  typeNotification: {
    type: String,
    trim: true,
    required: true,
    enum: ['info', 'alerte', 'rappel', 'autre'] // adapte selon tes types
  },
  dateEnvoi: {
    type: Date,
    default: Date.now,
    required: true
  },
  statutNotification: {
    type: String,
    enum: ['non lu', 'lu', 'archivé'],
    default: 'non lu',
    required: true
  },
  lienEntite: {
    type: String,
    trim: true,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
