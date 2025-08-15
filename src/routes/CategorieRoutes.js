const express = require('express');
const router = express.Router();
const CategorieController = require('../controllers/CategorieController');
const { authenticateToken, authorize } = require("../middlwares/auth");


router.post('/', authenticateToken, authorize('employe') ,CategorieController.createCategorie);
router.get('/',  CategorieController.getAllCategories);
router.get('/:id', CategorieController.getCategorieById);
router.put('/:id', authenticateToken, authorize('employe'), CategorieController.updateCategorie);
router.delete('/:id', authenticateToken, authorize('employe'), CategorieController.deleteCategorie);

module.exports = router;
