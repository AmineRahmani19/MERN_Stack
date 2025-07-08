const LigneCommande = require('../models/LigneCommandeFournisseur');

exports.createLigne = async (req, res) => {
  try {
    const ligne = await LigneCommande.create(req.body);
    res.status(201).json(ligne);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLignes = async (req, res) => {
  try {
    const lignes = await LigneCommande.find().populate('idCommandeFournisseur idLivre');
    res.json(lignes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLigneById = async (req, res) => {
  try {
    const ligne = await LigneCommande.findById(req.params.id).populate('idCommandeFournisseur idLivre');
    if (!ligne) return res.status(404).json({ message: 'Ligne not found' });
    res.json(ligne);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLigne = async (req, res) => {
  try {
    const ligne = await LigneCommande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ligne) return res.status(404).json({ message: 'Ligne not found' });
    res.json(ligne);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLigne = async (req, res) => {
  try {
    const ligne = await LigneCommande.findByIdAndDelete(req.params.id);
    if (!ligne) return res.status(404).json({ message: 'Ligne not found' });
    res.json({ message: 'Ligne deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
