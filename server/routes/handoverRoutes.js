import express from 'express';
import { itemsStore, notificationsStore } from './itemRoutes.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
let nextHandoverNum = 1025;

// @route POST /api/handover/schedule
router.post('/schedule', protect, (req, res) => {
  const { itemId, scheduledDate, scheduledTime, location, returnedTo } = req.body;

  const item = itemsStore.find(i => i._id === itemId || i.reportId === itemId);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  const handoverId = `WX-HO-${nextHandoverNum++}`;

  const handoverDetails = {
    handoverId,
    scheduledDate: scheduledDate || new Date().toISOString().split('T')[0],
    scheduledTime: scheduledTime || '16:00',
    location: location || 'Woxsen Security Desk (Main Entrance)',
    returnedTo: returnedTo || req.user.name,
    verifiedBy: 'Woxsen Security Verification Staff'
  };

  item.status = 'Handover Scheduled';
  item.handoverDetails = handoverDetails;

  item.historyTimeline.push({
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    title: 'Handover Scheduled',
    description: `Handover ID: ${handoverId} scheduled for ${handoverDetails.scheduledDate} at ${handoverDetails.scheduledTime} (${handoverDetails.location})`,
    actor: req.user.name
  });

  // Notify student
  notificationsStore.push({
    _id: `notif_${Date.now()}`,
    userId: req.user.id,
    title: '📅 Handover Scheduled!',
    message: `Your handover (${handoverId}) for ${item.name} is scheduled on ${handoverDetails.scheduledDate} at ${handoverDetails.scheduledTime}.`,
    type: 'handover',
    link: '/my-reports',
    read: false,
    createdAt: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    message: `Handover ${handoverId} scheduled successfully`,
    handoverId,
    handoverDetails,
    item
  });
});

// @route POST /api/handover/complete/:itemId
router.post('/complete/:itemId', protect, authorize('security', 'admin'), (req, res) => {
  const item = itemsStore.find(i => i._id === req.params.itemId || i.reportId === req.params.itemId);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  const { returnedToName, verifiedByNote } = req.body;

  item.status = 'Returned';
  if (!item.handoverDetails) {
    item.handoverDetails = {
      handoverId: `WX-HO-${Math.floor(1000 + Math.random() * 9000)}`,
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: 'Completed',
      location: 'Woxsen Security Desk Main Gate'
    };
  }

  item.handoverDetails.completedAt = new Date().toISOString();
  item.handoverDetails.returnedTo = returnedToName || item.handoverDetails.returnedTo || 'Verified Owner';
  item.handoverDetails.verifiedBy = req.user.name;

  item.historyTimeline.push({
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    title: 'Returned Successfully',
    description: `Handover verified and completed by ${req.user.name}. Item returned to ${item.handoverDetails.returnedTo}.`,
    actor: req.user.name
  });

  // Notify student if posted
  if (item.postedBy?._id) {
    notificationsStore.push({
      _id: `notif_${Date.now()}`,
      userId: item.postedBy._id,
      title: '🎉 Item Returned Successfully!',
      message: `Item ${item.name} (${item.reportId}) has been successfully returned. Lifecycle complete.`,
      type: 'handover',
      link: '/my-reports',
      read: false,
      createdAt: new Date().toISOString()
    });
  }

  res.json({
    success: true,
    message: `Item ${item.reportId} marked as Returned Successfully`,
    item
  });
});

export default router;
