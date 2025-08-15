const Utilisateur = require('../models/Utilisateur');
const CommandeFournisseur = require('../models/CommandeFournisseur');

async function verifierRoleUtilisateur(id, roleAttendu) {
  const utilisateur = await Utilisateur.findById(id);
  return utilisateur && utilisateur.role === roleAttendu;
}

exports.createCommande = async (req, res) => {
  try {
    const { idFournisseur, ...autresChamps } = req.body;

    const estFournisseur = await verifierRoleUtilisateur(idFournisseur, 'fournisseur');
    if (!estFournisseur) {
      return res.status(400).json({
        error: 'idFournisseur doit référencer un utilisateur avec le rôle "fournisseur".'
      });
    }

    const commande = new CommandeFournisseur({
      idFournisseur,
      ...autresChamps,
      idEmploye: req.user.id
    });

    await commande.save();
    res.status(201).json(commande);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommandes = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'employe') {
      filter = { idEmploye: req.user.id }; // l'employé voit seulement ses commandes
    } else if (req.user.role === 'fournisseur') {
      filter = { idFournisseur: req.user.id }; // le fournisseur voit seulement ses commandes
    }

    const commandes = await CommandeFournisseur.find(filter).populate('idFournisseur idEmploye');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommandeById = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findById(req.params.id).populate('idFournisseur idEmploye');
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });

    if (commande.idEmploye.toString() !== req.user.id && commande.idFournisseur.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Accès refusé à cette commande.' });
    }

    res.json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCommande = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findById(req.params.id);
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });

    if (commande.idEmploye.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Seul l’employé ayant créé la commande peut la modifier.' });
    }

    Object.assign(commande, req.body);
    await commande.save();

    res.json(commande);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCommande = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findById(req.params.id);
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });

    if (commande.idEmploye.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Seul l’employé ayant créé la commande peut la supprimer.' });
    }

    await commande.deleteOne();
    res.json({ message: 'Commande supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.suivreCommande = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findOne({ _id: req.params.id, idFournisseur: req.user.id })
      .populate('idFournisseur idEmploye');
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });

    res.json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.confirmDelivery = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findOne({ _id: req.params.id, idFournisseur: req.user.id });
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée' });

    if (commande.statutCommande === 'livree') {
      return res.status(400).json({ error: 'La commande a déjà été livrée.' });
    }

    commande.statutCommande = 'livree';
    commande.dateLivraisonEffective = new Date();
    await commande.save();

    res.json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
