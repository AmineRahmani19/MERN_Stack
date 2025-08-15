const express = require('express');
const router = express.Router();
const exemplaireController = require('../controllers/ExemplaireController');
const { authenticateToken, authorize } = require("../middlwares/auth");

router.post('/', authenticateToken, authorize('employe'), exemplaireController.createExemplaire);
router.get('/',  exemplaireController.getAllExemplaires);
router.get('/:id',  exemplaireController.getExemplaireById);
router.put('/:id', authenticateToken, authorize('employe'), exemplaireController.updateExemplaire);
router.delete('/:id', authenticateToken, authorize('employe'), exemplaireController.deleteExemplaire);

module.exports = router;