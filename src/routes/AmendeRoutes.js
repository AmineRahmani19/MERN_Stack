const express = require('express');
const router = express.Router();
const amendeController = require('../controllers/AmendeController');
const { authenticateToken, authorize } = require("../middlwares/auth");

router.post('/', authenticateToken, authorize('employe'), amendeController.createAmende);
router.get('/', authenticateToken, authorize('employe'), amendeController.getAmendes);
router.get('/:id', authenticateToken, authorize('employe','etudiant'), amendeController.getAmendeById);
router.put('/:id', authenticateToken, authorize('employe'), amendeController.updateAmende);
router.delete('/:id', authenticateToken, authorize('employe'), amendeController.deleteAmende);

module.exports = router;