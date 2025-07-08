const Livre = require('../models/Livre');

// Créer un nouveau livre
exports.createLivre = async (req, res) => {
  try {
    const livre = new Livre(req.body);
    const savedLivre = await livre.save();
    res.status(201).json(savedLivre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les livres
exports.getAllLivres = async (req, res) => {
  try {
    const livres = await Livre.find().populate('categorie');
    res.json(livres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un livre par ID
exports.getLivreById = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id).populate('categorie');
    if (!livre) return res.status(404).json({ message: 'Livre non trouvé' });
    res.json(livre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un livre
exports.updateLivre = async (req, res) => {
  try {
    const updatedLivre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLivre) return res.status(404).json({ message: 'Livre non trouvé' });
    res.json(updatedLivre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un livre
exports.deleteLivre = async (req, res) => {
  try {
    const deletedLivre = await Livre.findByIdAndDelete(req.params.id);
    if (!deletedLivre) return res.status(404).json({ message: 'Livre non trouvé' });
    res.json({ message: 'Livre supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
