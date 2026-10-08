import express from 'express';
import { initialMessages } from '../utils/memoryStore.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
export let messagesStore = [...initialMessages];

// AI Assistant Bot Response Helper
function generateAIResponse(userQuery = '') {
  const q = userQuery.toLowerCase();

  if (q.includes('security') || q.includes('desk') || q.includes('locker') || q.includes('verma') || q.includes('office')) {
    return "🛡️ **Woxsen Security Desk Info:** The Main Gate Security Desk is located right at the Main Entrance. Officer R.K. Verma and security staff log all collected items into designated security lockers (e.g. Locker 04). Desk helpline: +91 84488 11000.";
  }

  if (q.includes('location') || q.includes('where') || q.includes('library') || q.includes('vithal') || q.includes('trade tower') || q.includes('hostel') || q.includes('dining')) {
    return "📍 **Woxsen Campus Location Guide:** Main spots include Vithal Gandhi Centre (Central Library), Trade Tower, Academic Block (Floors 1-4), Oval Dining Hall, SportX Complex, R.A.C.E Arena, and Hostels A-F. Specify building, floor & room when filing reports for faster recovery!";
  }

  if (q.includes('claim') || q.includes('verify') || q.includes('proof') || q.includes('how to claim')) {
    return "🔐 **Claim Verification Guide:** Click 'Submit Ownership Claim' on any item detail page. Answer private secret questions (e.g. unique scratches, stickers, invoice serials). Your answers are strictly private and visible only to Security Staff for safety verification!";
  }

  if (q.includes('match') || q.includes('smart') || q.includes('algorithm') || q.includes('percent')) {
    return "✨ **Smart Matching Engine:** FindIt evaluates 6 weighted criteria: Category (25%), Location (25%), Description similarity (20%), Color (10%), Brand (10%), and Date proximity (10%). Check your 'Smart Matches' tab anytime!";
  }

  if (q.includes('lost') || q.includes('found') || q.includes('report') || q.includes('post')) {
    return "📦 **Filing a Report:** Click the '+' Post an Item button in the navigation bar. Complete the 6-step form with item photos, category, exact Woxsen campus location, date & time to instantly publish a report!";
  }

  return "🤖 **FindIt AI Assistant:** Hello! I'm your Woxsen Campus Lost & Found Assistant. I can help you locate campus buildings, check Security Desk hours, explain claim verification, or guide you through reporting lost items. How can I assist you today?";
}

// @route GET /api/messages/conversations
router.get('/conversations', protect, (req, res) => {
  const userMsgs = messagesStore.filter(
    m => m.sender._id === req.user.id || m.recipient._id === req.user.id
  );

  const convMap = {};
  userMsgs.forEach(msg => {
    if (!convMap[msg.conversationId]) {
      convMap[msg.conversationId] = {
        conversationId: msg.conversationId,
        itemId: msg.itemId,
        otherUser: msg.sender._id === req.user.id ? msg.recipient : msg.sender,
        lastMessage: msg.text,
        timestamp: msg.timestamp
      };
    } else {
      if (new Date(msg.timestamp) > new Date(convMap[msg.conversationId].timestamp)) {
        convMap[msg.conversationId].lastMessage = msg.text;
        convMap[msg.conversationId].timestamp = msg.timestamp;
      }
    }
  });

  // Ensure AI Assistant is always available in conversations list
  if (!convMap['conv_ai_assistant']) {
    convMap['conv_ai_assistant'] = {
      conversationId: 'conv_ai_assistant',
      itemId: 'ai_assistant',
      otherUser: {
        _id: 'bot_findit_ai',
        name: 'FindIt AI Campus Assistant',
        role: 'AI Bot',
        isAI: true
      },
      lastMessage: '🤖 Hello! Ask me anything about campus locations, security desk, or claims.',
      timestamp: new Date().toISOString()
    };
  }

  res.json({
    success: true,
    conversations: Object.values(convMap)
  });
});

// @route GET /api/messages/:conversationId
router.get('/:conversationId', protect, (req, res) => {
  const msgs = messagesStore.filter(m => m.conversationId === req.params.conversationId);
  res.json({
    success: true,
    messages: msgs
  });
});

// @route POST /api/messages
router.post('/', protect, (req, res) => {
  const { conversationId, itemId, recipientId, recipientName, recipientRole, text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, message: 'Message text cannot be empty' });
  }

  const convId = conversationId || `conv_${itemId}_${req.user.id}`;
  const isAIMessage = recipientId === 'bot_findit_ai' || convId === 'conv_ai_assistant';

  const userMsg = {
    _id: `msg_${Date.now()}`,
    conversationId: convId,
    itemId: itemId || 'item_101',
    sender: {
      _id: req.user.id,
      name: req.user.name,
      role: req.user.role
    },
    recipient: {
      _id: recipientId || (isAIMessage ? 'bot_findit_ai' : 'usr_student_2'),
      name: recipientName || (isAIMessage ? 'FindIt AI Campus Assistant' : 'Priya Reddy'),
      role: recipientRole || (isAIMessage ? 'AI Bot' : 'student')
    },
    text,
    timestamp: new Date().toISOString()
  };

  messagesStore.push(userMsg);

  // If messaging AI Assistant, generate automated AI Bot reply
  let aiReply = null;
  if (isAIMessage) {
    const replyText = generateAIResponse(text);
    aiReply = {
      _id: `msg_ai_${Date.now()}`,
      conversationId: 'conv_ai_assistant',
      itemId: 'ai_assistant',
      sender: {
        _id: 'bot_findit_ai',
        name: 'FindIt AI Campus Assistant',
        role: 'AI Bot',
        isAI: true
      },
      recipient: {
        _id: req.user.id,
        name: req.user.name,
        role: req.user.role
      },
      text: replyText,
      timestamp: new Date().toISOString()
    };
    messagesStore.push(aiReply);
  }

  res.status(201).json({
    success: true,
    message: userMsg,
    aiReply
  });
});

// @route DELETE /api/messages/:id
router.delete('/:id', protect, (req, res) => {
  const index = messagesStore.findIndex(m => m._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }

  messagesStore.splice(index, 1);
  res.json({ success: true, message: 'Message deleted successfully' });
});

// @route DELETE /api/messages/conversation/:conversationId
router.delete('/conversation/:conversationId', protect, (req, res) => {
  const convId = req.params.conversationId;
  messagesStore = messagesStore.filter(m => m.conversationId !== convId);
  res.json({ success: true, message: `Conversation ${convId} deleted` });
});

export default router;
