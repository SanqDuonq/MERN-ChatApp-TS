import express from 'express';
import controller from '../controllers/auth.controllers'
const router = express.Router()

router.get('/sign-up',controller.signup)
router.post('/login',controller.login)
router.post('/logout',controller.logout)

export default router