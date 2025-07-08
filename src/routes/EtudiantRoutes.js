const express = require('express');
const router = express.Router();
const EtudiantController = require('../controllers/EtudiantController');

router.post('/', EtudiantController.createEtudiant);
router.get('/', EtudiantController.getAllEtudiants);
router.get('/:id', EtudiantController.getEtudiantById);
router.put('/:id', EtudiantController.updateEtudiant);
router.delete('/:id', EtudiantController.deleteEtudiant);

module.exports = router;
