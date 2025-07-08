const Pret = require('../models/Pret');

exports.createPret = async (req, res) => {
  try {
    const pret = await Pret.create(req.body);
    res.status(201).json(pret);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPrets = async (req, res) => {
  try {
    const prets = await Pret.find().populate('idUtilisateur idExemplaire idEmploye');
    res.json(prets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPretById = async (req, res) => {
  try {
    const pret = await Pret.findById(req.params.id).populate('idUtilisateur idExemplaire idEmploye');
    if (!pret) return res.status(404).json({ message: 'Pret not found' });
    res.json(pret);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePret = async (req, res) => {
  try {
    const pret = await Pret.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pret) return res.status(404).json({ message: 'Pret not found' });
    res.json(pret);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePret = async (req, res) => {
  try {
    const pret = await Pret.findByIdAndDelete(req.params.id);
    if (!pret) return res.status(404).json({ message: 'Pret not found' });
    res.json({ message: 'Pret deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};















