const express = require('express');
const router = express.Router();
const exemplaireController = require('../controllers/ExemplaireController');

router.post('/', exemplaireController.createExemplaire);
router.get('/', exemplaireController.getAllExemplaires);
router.get('/:id', exemplaireController.getExemplaireById);
router.put('/:id', exemplaireController.updateExemplaire);
router.delete('/:id', exemplaireController.deleteExemplaire);

module.exports = router;