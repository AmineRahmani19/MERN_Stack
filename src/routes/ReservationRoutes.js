const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');
const { authenticateToken, authorize } = require("../middlwares/auth");

router.post('/', authenticateToken, authorize('employe','etudiant'), reservationController.createReservation);
router.get('/', authenticateToken, authorize('employe'), reservationController.getReservations);
router.get('/:id', authenticateToken, authorize('employe','etudiant'), reservationController.getReservationById);
router.put('/:id', authenticateToken, authorize('employe','etudiant'), reservationController.updateReservation);
router.delete('/:id', authenticateToken, authorize('employe','etudiant'), reservationController.deleteReservation);

module.exports = router;