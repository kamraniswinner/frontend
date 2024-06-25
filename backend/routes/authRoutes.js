import { Router } from 'express';
import { registerUser, authUser, requestPasswordReset, confirmPasswordReset } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/resetPassword/request', requestPasswordReset);
router.post('/resetPassword/confirm', confirmPasswordReset);

export default router;
