import express from 'express'
import { getMessages, sendMessage } from '../controllers/messageController.js'
import { protectRoute } from '../middleware/auth.js'
const router = express.Router()

router.route('/:id/send').post(protectRoute, sendMessage)
router.route('/:id').get(protectRoute, getMessages)

export default router;