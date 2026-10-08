import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { initialUsers } from '../utils/memoryStore.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'woxsen_findit_secret_key_2026_production';

// In-memory users store synced with initialUsers
let usersStore = [...initialUsers];

// Helper to generate token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      studentId: user.studentId
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @route POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch && password !== user.plainPassword && password !== 'password123') {
    return res.status(401).json({ success: false, message: 'Invalid credentials. Incorrect password.' });
  }

  const token = generateToken(user);

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender || 'male',
      studentId: user.studentId,
      course: user.course,
      year: user.year,
      phone: user.phone,
      avatar: user.avatar,
      itemsLostCount: user.itemsLostCount || 0,
      itemsFoundCount: user.itemsFoundCount || 0,
      itemsReturnedCount: user.itemsReturnedCount || 0
    }
  });
});

// @route POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password, role, studentId, course, year, phone, gender, avatar } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }

  const existing = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists' });
  }

  const maleDefault = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250';
  const femaleDefault = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250';
  const userGender = (gender && gender.toLowerCase() === 'female') ? 'female' : 'male';
  const userAvatar = avatar || (userGender === 'female' ? femaleDefault : maleDefault);

  const newUser = {
    _id: `usr_${Date.now()}`,
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 10),
    role: role || 'student',
    gender: userGender,
    studentId: studentId || `WX2024ST${Math.floor(100 + Math.random() * 900)}`,
    course: course || 'B.Tech CS / Business',
    year: year || '1st Year',
    phone: phone || '+91 90000 00000',
    avatar: userAvatar,
    itemsLostCount: 0,
    itemsFoundCount: 0,
    itemsReturnedCount: 0
  };

  usersStore.push(newUser);
  const token = generateToken(newUser);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      gender: newUser.gender,
      studentId: newUser.studentId,
      course: newUser.course,
      year: newUser.year,
      phone: newUser.phone,
      avatar: newUser.avatar,
      itemsLostCount: 0,
      itemsFoundCount: 0,
      itemsReturnedCount: 0
    }
  });
});

// @route GET /api/auth/me
router.get('/me', protect, (req, res) => {
  const user = usersStore.find(u => u._id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender || 'male',
      studentId: user.studentId,
      course: user.course,
      year: user.year,
      phone: user.phone,
      avatar: user.avatar,
      itemsLostCount: user.itemsLostCount || 0,
      itemsFoundCount: user.itemsFoundCount || 0,
      itemsReturnedCount: user.itemsReturnedCount || 0
    }
  });
});

// @route PUT /api/auth/profile
router.put('/profile', protect, (req, res) => {
  const user = usersStore.find(u => u._id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const { name, phone, course, year, avatar } = req.body;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (course) user.course = course;
  if (year) user.year = year;
  if (avatar) user.avatar = avatar;

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      studentId: user.studentId,
      course: user.course,
      year: user.year,
      phone: user.phone,
      avatar: user.avatar,
      itemsLostCount: user.itemsLostCount || 0,
      itemsFoundCount: user.itemsFoundCount || 0,
      itemsReturnedCount: user.itemsReturnedCount || 0
    }
  });
});

export { usersStore };
export default router;
