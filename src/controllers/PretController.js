const Pret = require('../models/Pret');
const Utilisateur = require('../models/Utilisateur');
const Exemplaire = require('../models/Exemplaire');

//emprunter= demandePret+validerPret

//Demande de pret par l'etudiant
exports.demanderPret = async (req, res) => {
  try {
    const { idUtilisateur, idExemplaire } = req.body;

    // Vérifie que l'utilisateur est un étudiant
    const utilisateur = await Utilisateur.findById(idUtilisateur);
    if (!utilisateur || utilisateur.role !== 'etudiant') {
      return res.status(400).json({ error: 'Seul un étudiant peut demander un prêt.' });
    }

    const exemplaire = await Exemplaire.findById(idExemplaire);
    if (!exemplaire) return res.status(400).json({ error: "L'exemplaire n'existe pas." });

    const pret = new Pret({
      idUtilisateur,
      idExemplaire,
      statutPret: 'en attente' // demande non validée
    });

    await pret.save();
    res.status(201).json({ message: 'Demande de prêt enregistrée.', pret });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Validation de pret par l'employee
exports.validerPret = async (req, res) => {
  try {
    const { idEmploye } = req.body; // l'employé qui valide
    const pret = await Pret.findById(req.params.id);

    if (!pret) return res.status(404).json({ message: 'Prêt non trouvé' });
    if (pret.statutPret !== 'en attente') {
      return res.status(400).json({ message: 'Le prêt a déjà été validé ou annulé.' });
    }

    pret.statutPret = 'en cours';
    pret.idEmploye = idEmploye;
    pret.dateEmprunt = new Date();

    await pret.save();
    res.json({ message: 'Prêt validé par l’employé.', pret });

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
    const pret = await Pret.findById(req.params.id)
      .populate('idUtilisateur idExemplaire idEmploye');
    if (!pret) return res.status(404).json({ message: 'Pret not found' });

    // Vérification des droits
    if (req.user.role === 'etudiant' && pret.idUtilisateur._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé : vous ne pouvez voir que vos propres prêts.' });
    }

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


exports.retournerPret = async (req, res) => {
  try {
    const pret = await Pret.findById(req.params.id);
    if (!pret) {
      return res.status(404).json({ message: 'Prêt non trouvé' });
    }

    // Vérifie que le prêt est encore en cours ou en retard
    if (pret.statutPret !== 'en cours' && pret.statutPret !== 'en retard') {
      return res.status(400).json({ message: 'Ce prêt est déjà retourné ou marqué comme perdu.' });
    }

    // Date de retour
    const dateRetour = new Date();
    pret.dateRetourEffective = dateRetour;

    // Déterminer le statut
    if (dateRetour <= pret.dateRetourPrevue) {
      pret.statutPret = 'retourne';
    } else {
      pret.statutPret = 'en retard';
    }

    await pret.save();

    res.json({
      message: 'Prêt mis à jour avec le retour.',
      pret
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
















