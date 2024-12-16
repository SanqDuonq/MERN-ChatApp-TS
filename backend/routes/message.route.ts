import express from 'express';
import middleware from '../middlewares/auth.middleware';
import controller from '../controllers/message.controllers';
const router = express.Router();

router.get('users',middleware.verifyToken, controller.getUserForSidebar);
router.get('/:id',middleware.verifyToken,controller.getMessages);



export default router;