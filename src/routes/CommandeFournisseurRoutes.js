const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/CommandeFournisseurController');
const { authenticateToken, authorize } = require("../middlwares/auth");

router.post('/', authenticateToken, authorize('employe'), commandeController.createCommande);
router.get('/', authenticateToken, authorize('employe','fournisseur'), commandeController.getCommandes);
router.get('/:id', authenticateToken, authorize('employe','fournisseur'), commandeController.getCommandeById);
router.put('/:id', authenticateToken, authorize('employe'), commandeController.updateCommande);
router.delete('/:id', authenticateToken, authorize('employe'), commandeController.deleteCommande);

router.get('/suivre/:id', authenticateToken, authorize('fournisseur'), commandeController.suivreCommande);
router.put('/confirmer/:id', authenticateToken, authorize('fournisseur'), commandeController.confirmDelivery);

module.exports = router;
