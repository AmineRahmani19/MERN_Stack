const Amende = require('../models/Amende');

exports.createAmende = async (req, res) => {
  try {
    const amende = await Amende.create(req.body);
    res.status(201).json(amende);
  } catch (error) {
    res.status(400).json({ error: error.message });
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