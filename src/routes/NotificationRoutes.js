const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');
const { authenticateToken, authorize } = require("../middlwares/auth");

router.post('/', authenticateToken, authorize('employe'), notificationController.createNotification);
router.get('/', authenticateToken, authorize('employe'), notificationController.getNotifications);
router.get('/:id', authenticateToken, authorize('employe'), notificationController.getNotificationById);
router.put('/:id', authenticateToken, authorize('employe'), notificationController.updateNotification);
router.delete('/:id', authenticateToken, authorize('employe'), notificationController.deleteNotification);

module.exports = router;