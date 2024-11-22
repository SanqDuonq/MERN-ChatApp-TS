import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller';

const router = express.Router()

router.get('/sign-up',signup)
router.post('/login',login)
router.post('/logout',logout)

export default router