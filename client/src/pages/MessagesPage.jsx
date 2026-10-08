import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Send, Shield, Lock, User, MessageSquare, Sparkles, Trash2, Bot, HelpCircle } from 'lucide-react';

export const MessagesPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const itemIdParam = searchParams.get('itemId') || 'item_101';
  const recipientIdParam = searchParams.get('recipientId') || 'usr_student_2';

  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState('conv_ai_assistant');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeConvId) {
      loadMessages(activeConvId);
    }
  }, [activeConvId]);

  const loadConversations = async () => {
    try {
      const res = await fetchApi('/messages/conversations');
      if (res.success && res.conversations.length > 0) {
        setConversations(res.conversations);
        setActiveConvId(res.conversations[0].conversationId);
      } else {
        setConversations([
          {
            conversationId: 'conv_ai_assistant',
            itemId: 'ai_assistant',
            otherUser: { name: 'FindIt AI Campus Assistant', role: 'AI Bot', isAI: true },
            lastMessage: '🤖 Hello! Ask me anything about campus locations, security desk, or claims.',
            timestamp: new Date().toISOString()
          },
          {
            conversationId: 'conv_101_102',
            itemId: itemIdParam,
            otherUser: { name: 'Priya Reddy', role: 'student' },
            lastMessage: 'Hi! I handed your wallet to Security Desk at 10 AM.',
            timestamp: new Date().toISOString()
          }
        ]);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (convId) => {
    try {
      const res = await fetchApi(`/messages/${convId}`);
      if (res.success && res.messages.length > 0) {
        setMessages(res.messages);
      } else if (convId === 'conv_ai_assistant') {
        setMessages([
          {
            _id: 'ai_intro',
            sender: { _id: 'bot_findit_ai', name: 'FindIt AI Campus Assistant', role: 'AI Bot', isAI: true },
            text: "🤖 **Welcome to FindIt AI Assistant!** I'm your Woxsen University campus helper. Ask me about campus building locations, Security Desk hours, claim verification steps, or reporting lost items.",
            timestamp: 'Now'
          }
        ]);
      } else {
        setMessages([
          {
            _id: 'm1',
            sender: { _id: 'usr_student_2', name: 'Priya Reddy', role: 'student' },
            text: 'Hi Aarav, I saw your post for the lost black wallet. I handed a similar wallet to the Security Desk at Main Gate around 10 AM.',
            timestamp: '10:15 AM'
          },
          {
            _id: 'm2',
            sender: { _id: user?.id || 'usr_student_1', name: user?.name || 'Aarav Sharma', role: 'student' },
            text: 'Thank you so much Priya! Did you notice if there was a Woxsen ID inside?',
            timestamp: '10:18 AM'
          }
        ]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSendMessage = async (textToSend = inputText) => {
    if (!textToSend || !textToSend.trim()) return;

    const currentConv = conversations.find(c => c.conversationId === activeConvId);
    const isAI = activeConvId === 'conv_ai_assistant' || currentConv?.otherUser?.isAI;

    const userMsg = {
      _id: `m_${Date.now()}`,
      conversationId: activeConvId,
      sender: { _id: user?.id || 'usr_student_1', name: user?.name || 'Aarav Sharma', role: user?.role || 'student' },
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    try {
      const res = await fetchApi('/messages', {
        method: 'POST',
        body: JSON.stringify({
          conversationId: activeConvId,
          itemId: itemIdParam,
          recipientId: isAI ? 'bot_findit_ai' : (currentConv?.otherUser?._id || 'usr_student_2'),
          recipientName: currentConv?.otherUser?.name || 'User',
          recipientRole: currentConv?.otherUser?.role || 'student',
          text: textToSend
        })
      });

      if (res.success && res.aiReply) {
        setMessages(prev => [...prev, res.aiReply]);
      }
    } catch (err) {
      console.warn('Local message store fallback');
    }
  };

  const handleDeleteMessage = async (msgId) => {
    setMessages(messages.filter(m => m._id !== msgId));
    try {
      await fetchApi(`/messages/${msgId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Local delete fallback');
    }
  };

  const handleDeleteConversation = async () => {
    if (!window.confirm('Are you sure you want to delete this entire chat conversation?')) return;

    setConversations(conversations.filter(c => c.conversationId !== activeConvId));
    setMessages([]);
    try {
      await fetchApi(`/messages/conversation/${activeConvId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Local conv delete fallback');
    }
  };

  const currentConv = conversations.find(c => c.conversationId === activeConvId);
  const isAIActive = activeConvId === 'conv_ai_assistant' || currentConv?.otherUser?.isAI;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            In-App Messaging &amp; AI Assistant
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Communicate safely regarding lost &amp; found items and get automated Woxsen AI assistance.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveConvId('conv_ai_assistant');
          }}
          className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          Chat with FindIt AI Assistant
        </button>
      </div>

      {/* Safety Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 flex items-center gap-3">
        <Shield className="w-5 h-5 text-blue-600 shrink-0" />
        <span>
          <strong>FindIt Safety Protocol:</strong> Do not publicly publish your personal phone numbers or payment information. Use Woxsen Security Desk for all physical item handovers.
        </span>
      </div>

      {/* Chat Container Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[520px]">
        
        {/* Left Sidebar: Conversations */}
        <div className="md:col-span-4 border-r border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Conversations</h3>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              AI Powered
            </span>
          </div>
          
          <div className="space-y-2">
            
            {/* AI Assistant Sticky Contact */}
            <div
              onClick={() => setActiveConvId('conv_ai_assistant')}
              className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                activeConvId === 'conv_ai_assistant'
                  ? 'bg-purple-50/90 border-purple-300 shadow-sm'
                  : 'bg-purple-50/30 border-purple-100 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-purple-900 text-xs flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-600" />
                  FindIt AI Assistant
                </span>
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              </div>
              <p className="text-[11px] text-purple-700 line-clamp-1 mt-1 font-medium">
                🤖 Campus location guide, claims &amp; security desk info
              </p>
            </div>

            {/* Other User Conversations */}
            {conversations.filter(c => c.conversationId !== 'conv_ai_assistant').map((conv) => (
              <div
                key={conv.conversationId}
                onClick={() => setActiveConvId(conv.conversationId)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  activeConvId === conv.conversationId
                    ? 'bg-blue-50/80 border-blue-200 shadow-sm'
                    : 'hover:bg-slate-50 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{conv.otherUser?.name || 'Campus Member'}</span>
                  <span className="text-[10px] text-slate-400">{new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1">{conv.lastMessage}</p>
              </div>
            ))}

          </div>
        </div>

        {/* Right Chat Transcript */}
        <div className="md:col-span-8 flex flex-col justify-between p-6 bg-slate-50/50">
          
          {/* Header Bar with Delete Chat button */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAIActive ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                {isAIActive ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAIActive ? 'FindIt AI Campus Assistant' : (currentConv?.otherUser?.name || 'Chat Conversation')}
                </h3>
                <span className="text-[10px] text-slate-400">
                  {isAIActive ? 'Automated Woxsen AI Support' : 'Verified Campus User'}
                </span>
              </div>
            </div>

            {/* Delete Conversation Option */}
            <button
              onClick={handleDeleteConversation}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-xs font-bold flex items-center gap-1"
              title="Delete Entire Chat"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete Chat</span>
            </button>
          </div>

          {/* Quick AI Prompts if chatting with AI */}
          {isAIActive && (
            <div className="py-2 flex flex-wrap gap-2 border-b border-slate-200/60 text-xs">
              <button
                onClick={() => handleSendMessage("Where is Vithal Gandhi Central Library?")}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-purple-700 rounded-full border border-purple-200 font-medium text-[11px] shadow-sm transition-all"
              >
                📍 Central Library?
              </button>
              <button
                onClick={() => handleSendMessage("What are the Security Desk office hours and location?")}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-purple-700 rounded-full border border-purple-200 font-medium text-[11px] shadow-sm transition-all"
              >
                🛡️ Security Desk Hours?
              </button>
              <button
                onClick={() => handleSendMessage("How do I submit a claim for a lost item?")}
                className="px-3 py-1 bg-white hover:bg-purple-50 text-purple-700 rounded-full border border-purple-200 font-medium text-[11px] shadow-sm transition-all"
              >
                🔐 How to Claim?
              </button>
            </div>
          )}

          {/* Transcript Messages */}
          <div className="space-y-4 overflow-y-auto max-h-[380px] py-4 pr-2">
            {messages.map((msg, idx) => {
              const isMe = msg.sender?._id === (user?.id || 'usr_student_1');
              const isAIBot = msg.sender?.isAI || msg.sender?._id === 'bot_findit_ai';

              return (
                <div key={idx} className={`group relative flex items-start gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  
                  {/* Delete Single Message Option on Hover */}
                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    className={`opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity self-center ${isMe ? 'order-first' : 'order-last'}`}
                    title="Delete Message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className={`max-w-md p-4 rounded-2xl text-xs space-y-1 shadow-sm ${
                    isMe 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : isAIBot 
                      ? 'bg-purple-900 text-white border border-purple-700 rounded-bl-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}>
                    <div className="font-bold opacity-90 text-[11px] flex items-center justify-between gap-2">
                      <span>{msg.sender?.name}</span>
                      {isAIBot && <span className="bg-purple-500/30 text-purple-200 text-[9px] px-1.5 py-0.5 rounded font-mono">AI BOT</span>}
                    </div>

                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    <div className={`text-[9px] text-right ${isMe ? 'text-blue-100' : isAIBot ? 'text-purple-300' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }} className="mt-2 flex items-center gap-2 pt-3 border-t border-slate-200">
            <input
              type="text"
              placeholder={isAIActive ? "Ask FindIt AI Assistant anything about campus lost & found..." : "Type your message..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-slate-200 text-xs bg-white focus:border-blue-500"
            />
            <button
              type="submit"
              className={`p-3 rounded-xl text-white shadow-md hover:opacity-95 transition-all ${
                isAIActive ? 'bg-purple-700 hover:bg-purple-800' : 'gradient-brand'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
