const express = require('express');
const router = express.Router();
const pretController = require('../controllers/PretController');
const { authenticateToken, authorize } = require("../middlwares/auth");

// Étudiant demande un prêt
router.post('/demander', authenticateToken, authorize('etudiant'), pretController.demanderPret);

// Employé valide un prêt
router.patch('/:id/valider', authenticateToken, authorize('employe'), pretController.validerPret);

router.get('/', authenticateToken, authorize('employe'), pretController.getPrets);
router.get('/:id', authenticateToken, authorize('employe','etudiant'), pretController.getPretById);
router.put('/:id', authenticateToken, authorize('employe'), pretController.updatePret);
router.delete('/:id', authenticateToken, authorize('employe'), pretController.deletePret);

// Retour d'un prêt
//patch: Modifier partiellement une ressource
router.patch(
'/:id/retour',
  authenticateToken,
  authorize('admin', 'employe'),
  pretController.retournerPret
);


module.exports = router;