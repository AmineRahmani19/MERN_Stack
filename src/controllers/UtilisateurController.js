const Utilisateur = require('../models/Utilisateur');

exports.createUtilisateur = async (req, res) => {
  try {
    const utilisateur = new Utilisateur(req.body);
    await utilisateur.save();
    res.status(201).json(utilisateur);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.status(200).json(utilisateurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.status(200).json(utilisateur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.status(200).json(utilisateur);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
    if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
