import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import claimRoutes from './routes/claimRoutes.js';
import securityRoutes from './routes/securityRoutes.js';
import handoverRoutes from './routes/handoverRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import metaRoutes from './routes/metaRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection (Graceful fallback to memory store if omitted)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Database'))
    .catch(err => console.warn('⚠️ MongoDB connection warning (Falling back to in-memory store):', err.message));
}

// CORS Middleware
const allowedOrigins = process.env.CLIENT_URL 
  ? [process.env.CLIENT_URL, 'http://localhost:3000', 'http://localhost:5001'] 
  : true;

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists and serve static uploaded images
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// Serve client images static directory
const clientPublicImages = path.join(__dirname, '../client/public/images');
if (fs.existsSync(clientPublicImages)) {
  app.use('/images', express.static(clientPublicImages));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/handover', handoverRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/meta', metaRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'FindIt - Woxsen University Lost & Found Coordination Platform',
    institution: 'Woxsen University',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend client dist if built
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      return res.sendFile(path.join(clientDistPath, 'index.html'));
    }
    res.status(404).json({ success: false, message: 'API endpoint not found' });
  });
}

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`⚡ FindIt - Woxsen University Full-Stack Server Running`);
  console.log(`🌐 Local Web App URL: http://localhost:${PORT}`);
  console.log(`📡 Health API: http://localhost:${PORT}/api/health`);
  console.log(`🎓 Institution: Woxsen University`);
  console.log(`==================================================`);
});
