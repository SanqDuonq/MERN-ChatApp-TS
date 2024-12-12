import express from 'express';
import authController from '../controllers/auth.controllers';
const router = express.Router()

router.post('/sign-up',authController.signUp);
router.post('/verify-email',authController.verifyEmail);
router.post('/sign-in',authController.signIn);
router.post('/logout',authController.logout);
router.post('/forgot-password',authController.forgotPassword);

router.put('/update-profile')

export default router