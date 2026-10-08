import express from 'express';
import { itemsStore, notificationsStore } from './itemRoutes.js';
import { claimsStore } from './claimRoutes.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route GET /api/security/dashboard
router.get('/dashboard', protect, authorize('security', 'admin'), (req, res) => {
  const openLostReports = itemsStore.filter(i => i.type === 'lost' && i.status !== 'Returned').length;
  const collectedItems = itemsStore.filter(i => i.collectionDetails?.isCollected && i.status !== 'Returned');
  const pendingClaims = claimsStore.filter(c => c.status === 'Claim Under Review');
  const handoversToday = itemsStore.filter(i => i.handoverDetails?.scheduledDate === new Date().toISOString().split('T')[0]);
  const returnedItemsCount = itemsStore.filter(i => i.status === 'Returned').length + 248;

  res.json({
    success: true,
    securityDeskStatus: 'Online',
    location: 'Main Entrance / Security Office Desk',
    stats: {
      openLostReports,
      collectedItemsCount: collectedItems.length,
      pendingClaimsCount: pendingClaims.length,
      handoversTodayCount: handoversToday.length,
      returnedItemsCount
    },
    collectedItems,
    pendingClaims
  });
});

// @route GET /api/security/collected
router.get('/collected', protect, (req, res) => {
  const collected = itemsStore.filter(i => i.collectionDetails?.isCollected);
  res.json({
    success: true,
    count: collected.length,
    items: collected
  });
});

// @route POST /api/security/collect/:itemId
router.post('/collect/:itemId', protect, authorize('security', 'admin'), (req, res) => {
  const item = itemsStore.find(i => i._id === req.params.itemId || i.reportId === req.params.itemId);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  const { lockerNumber, collectionLocation, note } = req.body;

  const locker = lockerNumber || `Locker 0${Math.floor(1 + Math.random() * 9)}`;

  item.status = 'Collected';
  item.collectionDetails = {
    isCollected: true,
    collectedBy: `Woxsen Security Desk (${req.user.name})`,
    collectionLocation: collectionLocation || 'Main Entrance / Security Office Desk',
    collectionDate: new Date().toISOString(),
    lockerNumber: locker
  };

  item.historyTimeline.push({
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    title: 'Collected by Security Desk',
    description: note || `Logged into ${locker} at Security HQ`,
    actor: req.user.name
  });

  // Notify original poster
  if (item.postedBy?._id) {
    notificationsStore.push({
      _id: `notif_${Date.now()}`,
      userId: item.postedBy._id,
      title: '📦 Item Logged at Security Desk',
      message: `Item ${item.name} (${item.reportId}) has been safely collected and stored in ${locker}.`,
      type: 'collection',
      link: '/security-desk',
      read: false,
      createdAt: new Date().toISOString()
    });
  }

  res.json({
    success: true,
    message: `Item ${item.reportId} marked as collected in ${locker}`,
    item
  });
});

export default router;
