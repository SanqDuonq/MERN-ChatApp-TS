import express from 'express';
import authController from '../controllers/auth.controllers';
import authMiddleware from '../middlewares/auth.middleware';
const router = express.Router()

router.post('/sign-up',authController.signUp);
router.post('/verify-email',authController.verifyEmail);
router.post('/sign-in',authController.signIn);
router.post('/logout',authController.logout);
router.post('/forgot-password',authController.forgotPassword);
router.post('/reset-password',authController.resetPassword);

router.put('/update-profile',authMiddleware.verifyToken,authController.updateProfile);

export default router