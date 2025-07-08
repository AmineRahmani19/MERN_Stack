const Etudiant = require('../models/Etudiant');

exports.createEtudiant = async (req, res) => {
  try {
    const etudiant = new Etudiant(req.body);
    const saved = await etudiant.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.find();
    res.json(etudiants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEtudiantById = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) return res.status(404).json({ message: 'Étudiant non trouvé' });
    res.json(etudiant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEtudiant = async (req, res) => {
  try {
    const updated = await Etudiant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Étudiant non trouvé' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    const deleted = await Etudiant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Étudiant non trouvé' });
    res.json({ message: 'Étudiant supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

console.log("test");
