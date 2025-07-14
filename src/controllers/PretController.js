const Pret = require('../models/Pret');
const Utilisateur = require('../models/Utilisateur');
const Exemplaire = require('../models/Exemplaire');

exports.createPret = async (req, res) => {
  try {
    const { idUtilisateur, idEmploye, idExemplaire, dateRetourPrevue } = req.body;

    // Vérifie que l'utilisateur est un étudiant
    const utilisateur = await Utilisateur.findById(idUtilisateur);
    if (!utilisateur || utilisateur.role !== 'etudiant') {
      return res.status(400).json({ error: 'idUtilisateur doit référencer un utilisateur avec le rôle "etudiant".' });
    }

    // Vérifie que l'employé est un employé
    const employe = await Utilisateur.findById(idEmploye);
    if (!employe || employe.role !== 'employe') {
      return res.status(400).json({ error: 'idEmploye doit référencer un utilisateur avec le rôle "employe".' });
    }

    // Optionnel : vérifier que l'exemplaire existe
    const exemplaire = await Exemplaire.findById(idExemplaire);
    if (!exemplaire) {
      return res.status(400).json({ error: "L'exemplaire n'existe pas." });
    }

    // Créer le prêt
    const pret = new Pret({
      idUtilisateur,
      idEmploye,
      idExemplaire,
      dateRetourPrevue
    });

    await pret.save();
    res.status(201).json(pret);

  } catch (err) {
    res.status(500).json({ error: err.message });
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















