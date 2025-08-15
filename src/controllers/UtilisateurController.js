const jwt = require("jsonwebtoken")
const Utilisateur = require('../models/Utilisateur');
const bcrypt = require("bcryptjs");


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email:user.email, nom:user.nom, prenom:user.prenom, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

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
      break;
    default:
      errors.push('Rôle invalide');
  }

  return errors;
};


//Spécifique au admin
exports.createUtilisateur = async (req, res) => {
  try {
    const { role } = req.body;
    const errors = validateRoleFields(role, req.body);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const utilisateur = new Utilisateur(req.body);
    await utilisateur.save();

    // 🔐 Générer le token JWT
    const token = generateToken(utilisateur);

    // ✅ Retourner utilisateur + token
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      utilisateur,
      token
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Inscription (pour etudiant, fournisseur, ou employe uniquement)
exports.register = async (req, res) => {
  try {
    const {
      nom, prenom, email, password, role,
      numeroEtudiant, filiere, niveauEtude,
      matricule, departement, roleEmploye,
      nomEntreprise, siret, adresseEntreprise, contactPrincipal
    } = req.body;

    // Vérifier que le rôle est valide
    const rolesAutorises = ['etudiant', 'fournisseur', 'employe'];
    if (!rolesAutorises.includes(role)) {
      return res.status(400).json({
        message: `Le rôle doit être l'un des suivants : ${rolesAutorises.join(', ')}`
      });
    }

    // Construire l'objet utilisateur selon le rôle
    const baseData = { nom, prenom, email, motDePasse: password, role };

    if (role === 'etudiant') {
      Object.assign(baseData, { numeroEtudiant, filiere, niveauEtude });
    } else if (role === 'employe') {
      Object.assign(baseData, { matricule, departement, roleEmploye });
    } else if (role === 'fournisseur') {
      Object.assign(baseData, { nomEntreprise, siret, adresseEntreprise, contactPrincipal });
    }

    const utilisateur = new Utilisateur(baseData);
    await utilisateur.save();

    const token = jwt.sign(
      { id: utilisateur._id, role: utilisateur.role },
      process.env.JWT_SECRET
    );

    res.status(201).json({ token, utilisateur });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Connexion
exports.login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérification de l'existence de l'utilisateur
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Comparaison des mots de passe
    const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Génération du token
    const token = jwt.sign(
      { id: utilisateur._id, role: utilisateur.role, nom:utilisateur.nom,prenom:utilisateur.prenom },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Optionnel : durée de validité du token
    );

    res.json({ token, utilisateur });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    // Vérification des droits
    if (req.user.role !== 'admin' && req.user.id !== utilisateur._id.toString()) {
      return res.status(403).json({ error: 'Accès refusé : vous ne pouvez voir que votre propre compte.' });
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

    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérification des droits : admin ou propriétaire
    if (req.user.role !== 'admin' && req.user.id !== utilisateur._id.toString()) {
      return res.status(403).json({ error: 'Accès refusé : vous ne pouvez modifier que votre propre compte.' });
    }

    Object.assign(utilisateur, req.body); // Met à jour uniquement les champs envoyés
    await utilisateur.save();

    res.status(200).json(utilisateur);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un utilisateur
exports.deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.params.id);
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérification des droits : admin ou propriétaire
    if (req.user.role !== 'admin' && req.user.id !== utilisateur._id.toString()) {
      return res.status(403).json({ error: 'Accès refusé : vous ne pouvez supprimer que votre propre compte.' });
    }

    await utilisateur.remove();
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






