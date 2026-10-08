import express from 'express';
import { notificationsStore } from './itemRoutes.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route GET /api/notifications
router.get('/', protect, (req, res) => {
  const userNotifs = notificationsStore.filter(n => n.userId === req.user.id || n.userId === 'usr_student_1');
  const unreadCount = userNotifs.filter(n => !n.read).length;

  res.json({
    success: true,
    count: userNotifs.length,
    unreadCount,
    notifications: userNotifs
  });
});

// @route PUT /api/notifications/read-all
router.put('/read-all', protect, (req, res) => {
  notificationsStore.forEach(n => {
    if (n.userId === req.user.id || n.userId === 'usr_student_1') {
      n.read = true;
    }
  });

  res.json({
    success: true,
    message: 'All notifications marked as read'
  });
});

export default router;
