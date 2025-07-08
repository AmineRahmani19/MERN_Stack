const Categorie = require('../models/Categorie');

exports.createCategorie = async (req, res) => {
  try {
    const categorie = new Categorie(req.body);
    const saved = await categorie.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategorie = async (req, res) => {
  try {
    const updated = await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Catégorie non trouvée' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCategorie = async (req, res) => {
  try {
    const deleted = await Categorie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Catégorie non trouvée' });
    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
