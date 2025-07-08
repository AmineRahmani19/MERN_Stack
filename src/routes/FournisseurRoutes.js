const express = require('express');
const router = express.Router();
const FournisseurController = require('../controllers/FournisseurController');

router.post('/', FournisseurController.createFournisseur);
router.get('/', FournisseurController.getAllFournisseurs);
router.get('/:id', FournisseurController.getFournisseurById);
router.put('/:id', FournisseurController.updateFournisseur);
router.delete('/:id', FournisseurController.deleteFournisseur);

module.exports = router;
