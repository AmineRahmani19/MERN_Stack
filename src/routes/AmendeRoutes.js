const express = require('express');
const router = express.Router();
const amendeController = require('../controllers/AmendeController');

router.post('/', amendeController.createAmende);
router.get('/', amendeController.getAmendes);
router.get('/:id', amendeController.getAmendeById);
router.put('/:id', amendeController.updateAmende);
router.delete('/:id', amendeController.deleteAmende);

module.exports = router;