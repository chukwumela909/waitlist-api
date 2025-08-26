import { Router } from 'express';
import { WaitlistController } from '../controllers/waitlistController';

const router = Router();
const waitlistController = new WaitlistController();

router.post('/waitlist', waitlistController.joinWaitlist);
router.get('/waitlist/stats', waitlistController.getWaitlistStats);

export { router as waitlistRoutes };