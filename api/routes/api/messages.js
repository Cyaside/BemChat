import express from "express"
import MessageController from "../../controllers/messageController.js"
import { authenticateToken } from "../../middleware/auth.js"

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

// POST /api/messages - Send new message
router.post("/", MessageController.sendMessage)

// GET /api/messages/conversations - Get all conversations
router.get("/conversations", MessageController.getConversations)

// GET /api/messages/users - Get all users for contact list
router.get("/users", MessageController.getUsers)

// GET /api/messages/:userId - Get conversation with specific user
router.get("/:userId", MessageController.getConversation)

// PUT /api/messages/:messageId - Update message
router.put("/:messageId", MessageController.updateMessage)

// DELETE /api/messages/:messageId - Delete message
router.delete("/:messageId", MessageController.deleteMessage)

export default router
