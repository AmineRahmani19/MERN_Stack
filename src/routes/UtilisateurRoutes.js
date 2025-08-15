const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/UtilisateurController');
const { authenticateToken, authorize } = require("../middlwares/auth");

router.post("/register", utilisateurController.register); // inscription client
router.post("/login", utilisateurController.login);       // connexion

router.post('/ajouter', authenticateToken, authorize('admin','employe'), utilisateurController.createUtilisateur);
router.get('/', authenticateToken, authorize('admin','employe'), utilisateurController.getUtilisateurs);

router.get('/:id', authenticateToken, authorize('admin','employe','etudiant','fournisseur'), utilisateurController.getUtilisateurById);
router.put('/:id', authenticateToken, authorize('admin','employe','etudiant','fournisseur'), utilisateurController.updateUtilisateur);
router.delete('/:id', authenticateToken, authorize('admin','employe','etudiant','fournisseur'), utilisateurController.deleteUtilisateur);


module.exports = router;







