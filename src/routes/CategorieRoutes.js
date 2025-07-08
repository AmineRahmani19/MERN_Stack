const express = require('express');
const router = express.Router();
const CategorieController = require('../controllers/CategorieController');

router.post('/', CategorieController.createCategorie);
router.get('/', CategorieController.getAllCategories);
router.get('/:id', CategorieController.getCategorieById);
router.put('/:id', CategorieController.updateCategorie);
router.delete('/:id', CategorieController.deleteCategorie);

module.exports = router;
