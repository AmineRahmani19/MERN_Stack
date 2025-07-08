const Fournisseur = require('../models/Fournisseur');

exports.createFournisseur = async (req, res) => {
  try {
    const fournisseur = new Fournisseur(req.body);
    const saved = await fournisseur.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.json(fournisseurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFournisseurById = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);
    if (!fournisseur) return res.status(404).json({ message: 'Fournisseur non trouvé' });
    res.json(fournisseur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFournisseur = async (req, res) => {
  try {
    const updated = await Fournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Fournisseur non trouvé' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFournisseur = async (req, res) => {
  try {
    const deleted = await Fournisseur.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Fournisseur non trouvé' });
    res.json({ message: 'Fournisseur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
