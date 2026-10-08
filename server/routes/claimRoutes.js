import express from 'express';
import { initialClaims } from '../utils/memoryStore.js';
import { itemsStore, notificationsStore } from './itemRoutes.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
export let claimsStore = [...initialClaims];
let nextClaimNum = 502;

// @route GET /api/claims
// Security/Admin gets all claims, Student gets their claims
router.get('/', protect, (req, res) => {
  let userClaims = [...claimsStore];

  if (req.user.role === 'student') {
    userClaims = userClaims.filter(c => c.claimant?._id === req.user.id);
  }

  res.json({
    success: true,
    count: userClaims.length,
    claims: userClaims
  });
});

// @route GET /api/claims/item/:itemId
router.get('/item/:itemId', protect, (req, res) => {
  const itemClaims = claimsStore.filter(c => c.itemId === req.params.itemId || c.itemReportId === req.params.itemId);
  res.json({
    success: true,
    claims: itemClaims
  });
});

// @route POST /api/claims
router.post('/', protect, (req, res) => {
  const { itemId, verificationAnswers, proofImages } = req.body;

  if (!itemId || !verificationAnswers || verificationAnswers.length === 0) {
    return res.status(400).json({ success: false, message: 'Item ID and verification answers are required' });
  }

  const item = itemsStore.find(i => i._id === itemId || i.reportId === itemId);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  const claimId = `WX-CLM-${nextClaimNum++}`;

  const newClaim = {
    _id: `claim_${Date.now()}`,
    claimId,
    itemId: item._id,
    itemReportId: item.reportId,
    itemName: item.name,
    claimant: {
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      studentId: req.user.studentId || 'WX2024ST091'
    },
    verificationAnswers, // [{ question, answer }]
    proofImages: proofImages || [],
    status: 'Claim Under Review',
    submittedAt: new Date().toISOString()
  };

  claimsStore.unshift(newClaim);

  // Update item status to Claim Under Review
  item.status = 'Claim Under Review';
  item.historyTimeline.push({
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    title: 'Ownership Claim Submitted',
    description: `Claim ${claimId} submitted by ${req.user.name}. Verification pending.`,
    actor: req.user.name
  });

  // Notify Security & Item poster
  notificationsStore.push({
    _id: `notif_${Date.now()}`,
    userId: 'usr_security_1',
    title: '🔐 New Ownership Claim Submitted',
    message: `A new claim (${claimId}) was submitted for ${item.name} by ${req.user.name}`,
    type: 'claim',
    link: '/security-desk',
    read: false,
    createdAt: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    message: `Claim ${claimId} submitted successfully`,
    claim: newClaim
  });
});

// @route PUT /api/claims/:id/verify
// Security / Admin verify action: Approved | Rejected | More Proof
router.put('/:id/verify', protect, authorize('security', 'admin'), (req, res) => {
  const { status, adminNotes } = req.body; // 'Claim Approved' | 'Rejected' | 'More Proof Requested'

  const claim = claimsStore.find(c => c._id === req.params.id || c.claimId === req.params.id);
  if (!claim) {
    return res.status(404).json({ success: false, message: 'Claim record not found' });
  }

  const item = itemsStore.find(i => i._id === claim.itemId);

  claim.status = status;
  if (adminNotes) claim.adminNotes = adminNotes;

  if (item) {
    if (status === 'Claim Approved') {
      item.status = 'Claim Approved';
      item.historyTimeline.push({
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        title: 'Claim Approved by Security',
        description: `Ownership verified for student ${claim.claimant.name}. Ready for handover scheduling.`,
        actor: req.user.name
      });
    } else if (status === 'Rejected') {
      item.status = item.collectionDetails?.isCollected ? 'Collected' : 'Looking for Owner';
      item.historyTimeline.push({
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        title: 'Claim Review Rejected',
        description: adminNotes || `Claim ${claim.claimId} verification failed.`,
        actor: req.user.name
      });
    }
  }

  // Notify claimant
  notificationsStore.push({
    _id: `notif_${Date.now()}`,
    userId: claim.claimant._id,
    title: status === 'Claim Approved' ? '🎉 Ownership Claim Approved!' : '🔐 Claim Status Update',
    message: status === 'Claim Approved' 
      ? `Your claim for ${claim.itemName} has been verified by Security! Proceed to schedule handover.`
      : `Update on claim ${claim.claimId}: ${status}. Notes: ${adminNotes || 'Contact Security Desk for info.'}`,
    type: 'claim',
    link: '/my-reports',
    read: false,
    createdAt: new Date().toISOString()
  });

  res.json({
    success: true,
    message: `Claim status updated to ${status}`,
    claim,
    item
  });
});

export default router;
