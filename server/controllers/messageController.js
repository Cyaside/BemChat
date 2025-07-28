import Message from "../models/message.js"
import User from "../models/user.js"

//404 = Masalah Routing di BE
//500 = Internal Server error ada kesalahan abis eksekusi
class MessageController {
  // Send new message
  static async sendMessage(req, res) {
    try {
      const { receiverId, content } = req.body
      const senderId = req.user.userId

      // Validation
      if (!receiverId || !content) {
        return res.status(400).json({
          success: false,
          message: "Receiver ID dan content harus diisi",
        })
      }

      if (content.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Pesan tidak boleh kosong",
        })
      }

      // Check if receiver exists
      const receiver = await User.findById(receiverId)
      if (!receiver) {
        return res.status(404).json({
          success: false,
          message: "Penerima tidak ditemukan",
        })
      }

      // Get sender info
      const sender = await User.findById(senderId)

      // Create new message
      const newMessage = new Message({
        senderId,
        senderUsername: sender.username,
        receiverId,
        receiverUsername: receiver.username,
        content: content.trim(),
      })

      const result = await newMessage.save()

      res.status(201).json({
        success: true,
        message: "Pesan berhasil dikirim",
        data: {
          _id: result.insertedId,
          senderId,
          senderUsername: sender.username,
          receiverId,
          receiverUsername: receiver.username,
          content: content.trim(),
          createdAt: newMessage.createdAt,
          isRead: false,
        },
      })
    } catch (error) {
      console.error("Send message error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }

  // Get conversation between two users
  static async getConversation(req, res) {
    try {
      const { userId } = req.params
      const currentUserId = req.user.userId
      const { page = 1, limit = 50 } = req.query

      const skip = (page - 1) * limit

      const messages = await Message.getConversation(
        currentUserId,
        userId,
        Number.parseInt(limit),
        Number.parseInt(skip),
      )

      // Mark messages as read
      await Message.markAsRead(userId, currentUserId)

      res.json({
        success: true,
        data: messages,
        pagination: {
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          hasMore: messages.length === Number.parseInt(limit),
        },
      })
    } catch (error) {
      console.error("Get conversation error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }

  // Get all conversations for current user
  static async getConversations(req, res) {
    try {
      const userId = req.user.userId

      const conversations = await Message.getUserConversations(userId)

      res.json({
        success: true,
        data: conversations,
      })
    } catch (error) {
      console.error("Get conversations error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }

  // Update message
  static async updateMessage(req, res) {
    try {
      const { messageId } = req.params
      const { content } = req.body
      const userId = req.user.userId

      if (!content || content.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Content tidak boleh kosong",
        })
      }

      // Check if message exists and user is the sender
      const message = await Message.findById(messageId)
      if (!message) {
        return res.status(404).json({
          success: false,
          message: "Pesan tidak ditemukan",
        })
      }

      if (message.senderId.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "Anda tidak bisa mengedit pesan orang lain",
        })
      }

      // Update message
      const result = await Message.updateById(messageId, {
        content: content.trim(),
      })

      if (result.modifiedCount === 0) {
        return res.status(400).json({
          success: false,
          message: "Gagal mengupdate pesan",
        })
      }

      res.json({
        success: true,
        message: "Pesan berhasil diupdate",
      })
    } catch (error) {
      console.error("Update message error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }

  // Delete message
  static async deleteMessage(req, res) {
    try {
      const { messageId } = req.params
      const userId = req.user.userId

      // Check if message exists and user is the sender
      const message = await Message.findById(messageId)
      if (!message) {
        return res.status(404).json({
          success: false,
          message: "Pesan tidak ditemukan",
        })
      }

      if (message.senderId.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: "Anda tidak bisa menghapus pesan orang lain",
        })
      }

      // Delete message
      const result = await Message.deleteById(messageId)

      if (result.deletedCount === 0) {
        return res.status(400).json({
          success: false,
          message: "Gagal menghapus pesan",
        })
      }

      res.json({
        success: true,
        message: "Pesan berhasil dihapus",
      })
    } catch (error) {
      console.error("Delete message error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }

  // Get all users for contact list
  static async getUsers(req, res) {
    try {
      const currentUserId = req.user.userId

      const users = await Message.getAllUsers(currentUserId)

      res.json({
        success: true,
        data: users,
      })
    } catch (error) {
      console.error("Get users error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }
}

export default MessageController
