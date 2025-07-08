const Exemplaire = require('../models/Exemplaire');

exports.createExemplaire = async (req, res) => {
  try {
    const exemplaire = new Exemplaire(req.body);
    await exemplaire.save();
    res.status(201).json(exemplaire);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllExemplaires = async (req, res) => {
  try {
    const exemplaires = await Exemplaire.find().populate('idLivre');
    res.json(exemplaires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExemplaireById = async (req, res) => {
  try {
    const exemplaire = await Exemplaire.findById(req.params.id);
    if (!exemplaire) return res.status(404).json({ message: 'Not found' });
    res.json(exemplaire);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExemplaire = async (req, res) => {
  try {
    const exemplaire = await Exemplaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exemplaire) return res.status(404).json({ message: 'Not found' });
    res.json(exemplaire);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteExemplaire = async (req, res) => {
  try {
    const deleted = await Exemplaire.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/pretController.js
const Pret = require('../models/Pret');

exports.createPret = async (req, res) => {
  try {
    const pret = new Pret(req.body);
    await pret.save();
    res.status(201).json(pret);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPrets = async (req, res) => {
  try {
    const prets = await Pret.find().populate('idUtilisateur').populate('idExemplaire').populate('idEmploye');
    res.json(prets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPretById = async (req, res) => {
  try {
    const pret = await Pret.findById(req.params.id);
    if (!pret) return res.status(404).json({ message: 'Not found' });
    res.json(pret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePret = async (req, res) => {
  try {
    const pret = await Pret.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pret) return res.status(404).json({ message: 'Not found' });
    res.json(pret);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePret = async (req, res) => {
  try {
    const deleted = await Pret.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



