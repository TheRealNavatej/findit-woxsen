import express from 'express';
import { categoriesData, woxsenLocationsData } from '../utils/memoryStore.js';

const router = express.Router();

// @route GET /api/meta/categories
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    count: categoriesData.length,
    categories: categoriesData
  });
});

// @route GET /api/meta/locations
router.get('/locations', (req, res) => {
  res.json({
    success: true,
    university: 'Woxsen University',
    count: woxsenLocationsData.length,
    locations: woxsenLocationsData
  });
});

export default router;
