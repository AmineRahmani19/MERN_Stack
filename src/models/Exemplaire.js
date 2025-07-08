const mongoose = require('mongoose');

const exemplaireSchema = new mongoose.Schema({
  idLivre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livre',
    required: true
  },
  codeBarre: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  statutExemplaire: {
    type: String,
    enum: ['disponible', 'emprunte', 'reserve', 'perdu'],
    default: 'disponible',
    required: true
  },
  localisation: {
    type: String,
    trim: true,
    required: true
  },
  dateAcquisition: {
    type: Date,
    required: true,
    default: Date.now
  },
  etat: {
    type: String,
    enum: ['neuf', 'bon', 'usage', 'endommage'],
    default: 'bon',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Exemplaire', exemplaireSchema);
