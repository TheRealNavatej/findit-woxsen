import express from 'express';
import { initialItems, initialMatches, initialNotifications } from '../utils/memoryStore.js';
import { calculateMatchScore } from '../utils/smartMatcher.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

export let itemsStore = [...initialItems];
export let matchesStore = [...initialMatches];
export let notificationsStore = [...initialNotifications];

let nextLostNum = 1054;
let nextFoundNum = 2056;

// Helper function for smart category matching
function matchesCategory(itemCategory = '', targetCategory = '') {
  const itemCat = itemCategory.toLowerCase().trim();
  const targetCat = targetCategory.toLowerCase().trim();

  if (targetCat === 'all' || !targetCat) return true;
  if (itemCat === targetCat) return true;
  if (itemCat.includes(targetCat) || targetCat.includes(itemCat)) return true;

  // Electronics group
  if (targetCat.includes('electronic')) {
    if (itemCat.includes('phone') || itemCat.includes('laptop') || itemCat.includes('tablet') || itemCat.includes('earbud') || itemCat.includes('headphone') || itemCat.includes('charger') || itemCat.includes('electronic') || itemCat.includes('watch')) return true;
  }
  // Mobile phones
  if (targetCat.includes('mobile') || targetCat.includes('phone')) {
    if (itemCat.includes('phone') || itemCat.includes('mobile')) return true;
  }
  // Laptops
  if (targetCat.includes('laptop')) {
    if (itemCat.includes('laptop') || itemCat.includes('macbook')) return true;
  }
  // Tablets
  if (targetCat.includes('tablet')) {
    if (itemCat.includes('tablet') || itemCat.includes('ipad')) return true;
  }
  // Earbuds / Headphones
  if (targetCat.includes('earbud') || targetCat.includes('headphone')) {
    if (itemCat.includes('earbud') || itemCat.includes('headphone') || itemCat.includes('airpods')) return true;
  }
  // Chargers
  if (targetCat.includes('charger') || targetCat.includes('cable')) {
    if (itemCat.includes('charger') || itemCat.includes('cable')) return true;
  }
  // ID Cards
  if (targetCat.includes('id') || targetCat.includes('card')) {
    if (itemCat.includes('id') || itemCat.includes('card')) return true;
  }
  // Wallets & Purses
  if (targetCat.includes('wallet') || targetCat.includes('purse')) {
    if (itemCat.includes('wallet') || itemCat.includes('purse')) return true;
  }
  // Bags & Backpacks
  if (targetCat.includes('bag') || targetCat.includes('backpack')) {
    if (itemCat.includes('bag') || itemCat.includes('backpack')) return true;
  }
  // Watches & Wearables / Smartwatch
  if (targetCat.includes('watch') || targetCat.includes('wearable') || targetCat.includes('smartwatch')) {
    if (itemCat.includes('watch') || itemCat.includes('wearable') || itemCat.includes('smartwatch')) return true;
  }
  // Jewellery
  if (targetCat.includes('jewel') || targetCat.includes('gem')) {
    if (itemCat.includes('jewel') || itemCat.includes('gem') || itemCat.includes('ring')) return true;
  }
  // Keys
  if (targetCat.includes('key')) {
    if (itemCat.includes('key')) return true;
  }
  // Books & Notebooks
  if (targetCat.includes('book') || targetCat.includes('notebook')) {
    if (itemCat.includes('book') || itemCat.includes('notebook')) return true;
  }
  // Clothing
  if (targetCat.includes('cloth') || targetCat.includes('jacket') || targetCat.includes('shirt')) {
    if (itemCat.includes('cloth') || itemCat.includes('jacket') || itemCat.includes('shirt')) return true;
  }
  // Sports
  if (targetCat.includes('sport') || targetCat.includes('dumb')) {
    if (itemCat.includes('sport') || itemCat.includes('court') || itemCat.includes('ball')) return true;
  }
  // Water bottles
  if (targetCat.includes('water') || targetCat.includes('bottle')) {
    if (itemCat.includes('water') || itemCat.includes('bottle') || itemCat.includes('flask')) return true;
  }
  // Glasses & Eyewear
  if (targetCat.includes('glass') || targetCat.includes('eyewear')) {
    if (itemCat.includes('glass') || itemCat.includes('eyewear')) return true;
  }
  // Umbrellas
  if (targetCat.includes('umbrella')) {
    if (itemCat.includes('umbrella')) return true;
  }
  // Documents
  if (targetCat.includes('doc') || targetCat.includes('file')) {
    if (itemCat.includes('doc') || itemCat.includes('file') || itemCat.includes('paper')) return true;
  }

  return false;
}

// @route GET /api/items
// Query params: type (lost|found), category, location, status, search, sort
router.get('/', (req, res) => {
  const { type, category, location, status, search, sort } = req.query;

  let results = [...itemsStore];

  if (type && type !== 'all') {
    results = results.filter(i => i.type.toLowerCase() === type.toLowerCase());
  }

  if (category && category !== 'all') {
    results = results.filter(i => matchesCategory(i.category, category));
  }

  if (location && location !== 'all') {
    results = results.filter(i => {
      const b = i.location?.building || i.location || '';
      return b.toLowerCase().includes(location.toLowerCase());
    });
  }

  if (status && status !== 'all') {
    results = results.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(i => 
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q) ||
      (i.location?.building && i.location.building.toLowerCase().includes(q)) ||
      i.reportId.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sort === 'oldest') {
    results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === 'match') {
    results.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
  } else {
    // Default newest
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.json({
    success: true,
    count: results.length,
    items: results
  });
});

// @route GET /api/items/stats
router.get('/stats', (req, res) => {
  const totalReported = itemsStore.length + 242;
  const totalFound = itemsStore.filter(i => i.type === 'found').length + 180;
  const totalCollected = itemsStore.filter(i => i.collectionDetails?.isCollected).length + 140;
  const totalReturned = itemsStore.filter(i => i.status === 'Returned').length + 248;
  const successfulMatches = 96;

  res.json({
    success: true,
    stats: {
      itemsReported: totalReported,
      itemsFound: totalFound,
      itemsCollected: totalCollected,
      itemsReturned: totalReturned,
      matchPercentage: successfulMatches,
      campusMembers: '1.8K',
      avgResponse: '12 min'
    }
  });
});

// @route GET /api/items/:id
router.get('/:id', (req, res) => {
  const item = itemsStore.find(i => i._id === req.params.id || i.reportId === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  const oppositeType = item.type === 'lost' ? 'found' : 'lost';
  const candidates = itemsStore.filter(c => c.type === oppositeType && c._id !== item._id);
  
  const matches = candidates.map(candidate => {
    const matchRes = calculateMatchScore(item, candidate);
    return {
      candidate,
      matchScore: matchRes.score,
      reasons: matchRes.reasons
    };
  }).filter(m => m.matchScore > 50).sort((a, b) => b.matchScore - a.matchScore);

  res.json({
    success: true,
    item,
    smartMatches: matches
  });
});

// @route POST /api/items
router.post('/', protect, (req, res) => {
  const {
    type,
    name,
    category,
    description,
    color,
    brand,
    distinctiveFeatures,
    location,
    date,
    time,
    images,
    isWithFinder,
    handedToSecurity
  } = req.body;

  if (!type || !name || !category || !location || !date) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  const isLost = type.toLowerCase() === 'lost';
  const reportId = isLost ? `WX-LOST-${nextLostNum++}` : `WX-FOUND-${nextFoundNum++}`;

  const defaultImage = isLost ? '/images/item_wallet_1791180978617.jpg' : '/images/item_smartphone_1791181014540.jpg';

  const newItem = {
    _id: `item_${Date.now()}`,
    reportId,
    type: type.toLowerCase(),
    name,
    category,
    description: description || 'No detailed description provided.',
    color: color || 'Unspecified',
    brand: brand || 'N/A',
    distinctiveFeatures: distinctiveFeatures || 'None listed',
    location: typeof location === 'string' ? { building: location, floor: 'Main', roomArea: '', specificLocation: location } : location,
    date: date || new Date().toISOString().split('T')[0],
    time: time || '12:00',
    postedBy: {
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    },
    images: (images && images.length > 0) ? images : [defaultImage],
    status: handedToSecurity ? 'Collected' : (isLost ? 'Looking for Owner' : 'Reported'),
    matchPercentage: 0,
    isWithFinder: !!isWithFinder,
    handedToSecurity: !!handedToSecurity,
    collectionDetails: {
      isCollected: !!handedToSecurity,
      collectedBy: handedToSecurity ? 'Woxsen Security Desk' : 'N/A',
      collectionLocation: handedToSecurity ? 'Main Security Office' : 'N/A',
      collectionDate: handedToSecurity ? new Date().toISOString() : null,
      lockerNumber: handedToSecurity ? `Security Locker ${Math.floor(1 + Math.random() * 15)}` : 'N/A'
    },
    historyTimeline: [
      {
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        title: `Item Reported ${isLost ? 'Lost' : 'Found'}`,
        description: `Report filed by ${req.user.name}`,
        actor: req.user.name
      }
    ],
    createdAt: new Date().toISOString()
  };

  if (handedToSecurity) {
    newItem.historyTimeline.push({
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      title: 'Collected by Security Desk',
      description: `Item handed to security and stored in ${newItem.collectionDetails.lockerNumber}`,
      actor: 'Woxsen Security Desk'
    });
  }

  const oppositeType = newItem.type === 'lost' ? 'found' : 'lost';
  const existingOpposites = itemsStore.filter(i => i.type === oppositeType);

  let bestMatchScore = 0;
  existingOpposites.forEach(opp => {
    const matchRes = calculateMatchScore(newItem, opp);
    if (matchRes.score > 60) {
      if (matchRes.score > bestMatchScore) bestMatchScore = matchRes.score;

      const newMatch = {
        _id: `match_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        lostItemId: newItem.type === 'lost' ? newItem._id : opp._id,
        foundItemId: newItem.type === 'found' ? newItem._id : opp._id,
        matchScore: matchRes.score,
        reasons: matchRes.reasons,
        status: 'Suggested'
      };
      matchesStore.push(newMatch);

      if (opp.postedBy?._id) {
        notificationsStore.push({
          _id: `notif_${Date.now()}`,
          userId: opp.postedBy._id,
          title: `✨ New ${matchRes.score}% Smart Match Found!`,
          message: `A ${matchRes.score}% match was detected for your item: ${opp.name}`,
          type: 'match',
          link: '/smart-matches',
          read: false,
          createdAt: new Date().toISOString()
        });
      }
    }
  });

  newItem.matchPercentage = bestMatchScore;
  itemsStore.unshift(newItem);

  res.status(201).json({
    success: true,
    message: `Item successfully reported as ${reportId}`,
    reportId,
    item: newItem
  });
});

// @route PUT /api/items/:id/status
router.put('/:id/status', protect, (req, res) => {
  const item = itemsStore.find(i => i._id === req.params.id || i.reportId === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  const { status, note, collectionDetails, handoverDetails } = req.body;

  if (status) {
    item.status = status;
    item.historyTimeline.push({
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      title: `Status Updated to ${status}`,
      description: note || `Status changed by ${req.user.name}`,
      actor: req.user.name
    });
  }

  if (collectionDetails) {
    item.collectionDetails = {
      ...item.collectionDetails,
      ...collectionDetails,
      isCollected: true,
      collectionDate: new Date().toISOString()
    };
  }

  if (handoverDetails) {
    item.handoverDetails = {
      ...item.handoverDetails,
      ...handoverDetails
    };
  }

  res.json({
    success: true,
    message: 'Item status updated',
    item
  });
});

// @route DELETE /api/items/:id
router.delete('/:id', protect, authorize('admin', 'security'), (req, res) => {
  const index = itemsStore.findIndex(i => i._id === req.params.id || i.reportId === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  itemsStore.splice(index, 1);
  res.json({ success: true, message: 'Item report removed successfully' });
});

export default router;
