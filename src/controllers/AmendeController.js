const Amende = require('../models/Amende');
const Pret = require('../models/Pret');
const Utilisateur = require('../models/Utilisateur');

// Fonction utilitaire locale (si tu ne veux pas créer un fichier utils séparé)
async function verifierRoleUtilisateur(id, roleAttendu) {
  const utilisateur = await Utilisateur.findById(id);
  return utilisateur && utilisateur.role === roleAttendu;
}

exports.createAmende = async (req, res) => {
  try {
    const { idPret, idUtilisateur, montant, raison } = req.body;

    // 1. Vérifie que le prêt existe
    const pret = await Pret.findById(idPret);
    if (!pret) {
      return res.status(404).json({ error: 'Prêt non trouvé.' });
    }

    // 2. Vérifie que l'utilisateur est un étudiant
    const estEtudiant = await verifierRoleUtilisateur(idUtilisateur, 'etudiant');
    if (!estEtudiant) {
      return res.status(400).json({
        error: 'idUtilisateur doit référencer un utilisateur avec le rôle "etudiant".'
      });
    }

    // 3. Créer et sauvegarder l'amende
    const amende = new Amende({
      idPret,
      idUtilisateur,
      montant,
      raison
    });

    await amende.save();
    res.status(201).json(amende);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAmendes = async (req, res) => {
  try {
    const amendes = await Amende.find().populate('idPret idUtilisateur');
    res.json(amendes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAmendeById = async (req, res) => {
  try {
    const amende = await Amende.findById(req.params.id).populate('idPret idUtilisateur');
    if (!amende) return res.status(404).json({ message: 'Amende not found' });
    res.json(amende);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAmende = async (req, res) => {
  try {
    const amende = await Amende.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!amende) return res.status(404).json({ message: 'Amende not found' });
    res.json(amende);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAmende = async (req, res) => {
  try {
    const amende = await Amende.findByIdAndDelete(req.params.id);
    if (!amende) return res.status(404).json({ message: 'Amende not found' });
    res.json({ message: 'Amende deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};