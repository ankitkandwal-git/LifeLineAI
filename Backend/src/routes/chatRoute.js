import express from 'express';
const router = express.Router();
import chatController from '../controller/chatController.js';


router.post('/chat', chatController.createChat);

export default router;