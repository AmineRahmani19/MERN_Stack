const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    required: true
  },
  prenom: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    trim: true,
    required: true
  },
  dateInscription: {
    type: Date,
    default: Date.now,
    required: true
  },
  statut: {
    type: String,
    trim: true,
    enum: ['actif', 'inactif', 'suspendu'],
    default: 'actif',
    required: true
  },

  role: {
    type: String,
    trim: true,
    enum: ['etudiant', 'employe', 'admin', 'fournisseur'],
    required: true
  },

  // Champs spécifiques aux rôles

  // Étudiant
  numeroEtudiant: {
    type: Number,
    trim: true
  },
  filiere: {
    type: String,
    trim: true
  },
  niveauEtude: {
    type: String,
    trim: true
  },
  maxEmprunts: {
    type: Number,
    default: 3
  },

  // Employé
  matricule: {
    type: Number,
    trim: true
  },
  departement: {
    type: String,
    trim: true
  },
  roleEmploye: {
    type: String,
    trim: true
  },

  // Fournisseur
  nomEntreprise: {
    type: String,
    trim: true
  },
  siret: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  adresseEntreprise: {
    type: String,
    trim: true
  },
  contactPrincipal: {
    type: String,
    trim: true
  },
}, {
  timestamps: true
});

// Hash du mot de passe avant save
utilisateurSchema.pre("save", async function (next) {
  if (!this.isModified("motDePasse")) return next(); 
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  next();
});


module.exports = mongoose.model('Utilisateur', utilisateurSchema);
