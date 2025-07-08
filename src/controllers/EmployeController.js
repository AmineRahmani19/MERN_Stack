const Employe = require('../models/Employe');

//Creation d'un employe
exports.createEmploye = async (req, res) => {
  try {
    const employe = new Employe(req.body);
    const saved = await employe.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Récupération de tous les employee
exports.getAllEmployes = async (req, res) => {
  try {
    const employes = await Employe.find();
    res.json(employes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeById = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(employe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmploye = async (req, res) => {
  try {
    const updated = await Employe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmploye = async (req, res) => {
  try {
    const deleted = await Employe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employé non trouvé' });
    res.json({ message: 'Employé supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
