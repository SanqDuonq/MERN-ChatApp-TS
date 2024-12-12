import express from 'express';
import authController from '../controllers/auth.controllers';
const router = express.Router()

router.post('/sign-up',authController.signUp);
router.post('/verify-email',authController.verifyEmail);
router.post('/sign-in',authController.signIn);

// router.post('/logout',controller.logout)

export default router