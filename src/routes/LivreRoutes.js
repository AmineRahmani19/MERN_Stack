// routes/livreRoutes.js
const express = require('express');
const router = express.Router();
const livreController = require('../controllers/LivreController');
const { authenticateToken, authorize } = require("../middlwares/auth");

router.post('/', authenticateToken, authorize('employe'), livreController.createLivre);
router.get('/', livreController.getAllLivres);
router.get('/:id', livreController.getLivreById);
router.put('/:id',authenticateToken, authorize('employe'), livreController.updateLivre);
router.delete('/:id',authenticateToken, authorize('employe'), livreController.deleteLivre);

module.exports = router;
