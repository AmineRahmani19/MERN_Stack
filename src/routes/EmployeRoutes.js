const express = require('express');
const router = express.Router();
const EmployeController = require('../controllers/EmployeController');

router.post('/', EmployeController.createEmploye);
router.get('/', EmployeController.getAllEmployes);
router.get('/:id', EmployeController.getEmployeById);
router.put('/:id', EmployeController.updateEmploye);
router.delete('/:id', EmployeController.deleteEmploye);

module.exports = router;
