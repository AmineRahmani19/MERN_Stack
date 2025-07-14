const Utilisateur = require('../models/Utilisateur');
const CommandeFournisseur = require('../models/CommandeFournisseur');

async function verifierRoleUtilisateur(id, roleAttendu) {
  const utilisateur = await Utilisateur.findById(id);
  return utilisateur && utilisateur.role === roleAttendu;
}

exports.createCommande = async (req, res) => {
  try {
    const { idFournisseur, ...autresChamps } = req.body;

    // Vérifie que le fournisseur est bien un utilisateur avec le rôle "fournisseur"
    const estFournisseur = await verifierRoleUtilisateur(idFournisseur, 'fournisseur');
    if (!estFournisseur) {
      return res.status(400).json({
        error: 'idFournisseur doit référencer un utilisateur avec le rôle "fournisseur".'
      });
    }

    const commande = new CommandeFournisseur({
      idFournisseur,
      ...autresChamps
    });

    await commande.save();
    res.status(201).json(commande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommandes = async (req, res) => {
  try {
    const commandes = await CommandeFournisseur.find().populate('idFournisseur idEmploye');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommandeById = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findById(req.params.id).populate('idFournisseur idEmploye');
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCommande = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.json(commande);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCommande = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findByIdAndDelete(req.params.id);
    if (!commande) return res.status(404).json({ message: 'Commande not found' });
    res.json({ message: 'Commande deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};