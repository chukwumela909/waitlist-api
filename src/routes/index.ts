import { Router } from 'express';
import { waitlistRoutes } from './waitlistRoutes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
router.use('/api', waitlistRoutes);

export { router as routes };