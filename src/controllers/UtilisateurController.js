const Utilisateur = require('../models/Utilisateur');

// Fonction utilitaire pour valider les champs requis selon le rôle
const validateRoleFields = (role, body) => {
  const errors = [];

  switch (role) {
    case 'etudiant':
      if (!body.numeroEtudiant) errors.push('numeroEtudiant est requis pour un étudiant');
      if (!body.filiere) errors.push('filiere est requise pour un étudiant');
      if (!body.niveauEtude) errors.push('niveauEtude est requis pour un étudiant');
      break;
    case 'employe':
      if (!body.matricule) errors.push('matricule est requis pour un employé');
      if (!body.departement) errors.push('departement est requis pour un employé');
      if (!body.roleEmploye) errors.push('roleEmploye est requis pour un employé');
      break;
    case 'fournisseur':
      if (!body.nomEntreprise) errors.push('nomEntreprise est requis pour un fournisseur');
      if (!body.siret) errors.push('siret est requis pour un fournisseur');
      if (!body.adresseEntreprise) errors.push('adresseEntreprise est requise pour un fournisseur');
      if (!body.contactPrincipal) errors.push('contactPrincipal est requis pour un fournisseur');
      break;
    case 'admin':
      if (!body.niveauAcces) errors.push('niveauAcces est requis pour un admin');
      if (!body.zoneResponsabilite) errors.push('zoneResponsabilite est requise pour un admin');
      break;
    default:
      errors.push('Rôle invalide');
  }

  return errors;
};

// Créer un utilisateur
exports.createUtilisateur = async (req, res) => {
  try {
    const { role } = req.body;
    const errors = validateRoleFields(role, req.body);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const utilisateur = new Utilisateur(req.body);
    await utilisateur.save();
    res.status(201).json(utilisateur);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les utilisateurs
exports.getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.status(200).json(utilisateurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un utilisateur par ID
exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json(utilisateur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUtilisateur = async (req, res) => {
  try {
    const { role } = req.body;
    const errors = validateRoleFields(role, req.body);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const utilisateur = await Utilisateur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json(utilisateur);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un utilisateur
exports.deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
