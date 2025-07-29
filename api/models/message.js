import { MongoClient, ObjectId } from "mongodb"

export default class Message {
  constructor(messageData) {
    this.senderId = messageData.senderId
    this.senderUsername = messageData.senderUsername
    this.receiverId = messageData.receiverId
    this.receiverUsername = messageData.receiverUsername
    this.content = messageData.content
    this.createdAt = messageData.createdAt || new Date()
    this.updatedAt = messageData.updatedAt || new Date()
    this.isRead = messageData.isRead || false
  }

  // Save message ke database
  async save() {
    const db = await this.getDB()
    const messagesCollection = db.collection("messages")

    const result = await messagesCollection.insertOne({
      senderId: new ObjectId(this.senderId),
      senderUsername: this.senderUsername,
      receiverId: new ObjectId(this.receiverId),
      receiverUsername: this.receiverUsername,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isRead: this.isRead,
    })

    return result
  }

  // Get all messages between two users
  static async getConversation(userId1, userId2, limit = 50, skip = 0) {
    const db = await Message.getDB()
    const messagesCollection = db.collection("messages")

    const messages = await messagesCollection
      .find({
        $or: [
          {
            senderId: new ObjectId(userId1),
            receiverId: new ObjectId(userId2),
          },
          {
            senderId: new ObjectId(userId2),
            receiverId: new ObjectId(userId1),
          },
        ],
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .toArray()

    return messages.reverse() // Paling tua msg di atas
  }

  // Get all convo for a user
  static async getUserConversations(userId) {
    const db = await Message.getDB()
    const messagesCollection = db.collection("messages")

    // Get latest message for each convo
    const conversations = await messagesCollection
      .aggregate([
        {
          $match: {
            $or: [{ senderId: new ObjectId(userId) }, { receiverId: new ObjectId(userId) }],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: {
            _id: {
              $cond: {
                if: { $eq: ["$senderId", new ObjectId(userId)] },
                then: "$receiverId",
                else: "$senderId",
              },
            },
            lastMessage: { $first: "$$ROOT" },
            unreadCount: {
              $sum: {
                $cond: {
                  if: {
                    $and: [{ $eq: ["$receiverId", new ObjectId(userId)] }, { $eq: ["$isRead", false] }],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
          },
        },
        {
          $sort: { "lastMessage.createdAt": -1 },
        },
      ])
      .toArray()

    return conversations
  }

  // Find message by ID
  static async findById(id) {
    const db = await Message.getDB()
    const messagesCollection = db.collection("messages")
    return await messagesCollection.findOne({ _id: new ObjectId(id) })
  }

  // Update message
  static async updateById(id, updateData) {
    const db = await Message.getDB()
    const messagesCollection = db.collection("messages")

    const result = await messagesCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    return result
  }

  // Delete message
  static async deleteById(id) {
    const db = await Message.getDB()
    const messagesCollection = db.collection("messages")
    return await messagesCollection.deleteOne({ _id: new ObjectId(id) })
  }

  // Mark messages as read
  static async markAsRead(senderId, receiverId) {
    const db = await Message.getDB()
    const messagesCollection = db.collection("messages")

    const result = await messagesCollection.updateMany(
      {
        senderId: new ObjectId(senderId),
        receiverId: new ObjectId(receiverId),
        isRead: false,
      },
      {
        $set: {
          isRead: true,
          updatedAt: new Date(),
        },
      },
    )

    return result
  }

  // Get all users (utk contact list)
  static async getAllUsers(currentUserId) {
    const db = await Message.getDB()
    const usersCollection = db.collection("users")

    const users = await usersCollection
      .find({ _id: { $ne: new ObjectId(currentUserId) } }, { projection: { password: 0 } })
      .toArray()

    return users
  }

  // Get database connection
  static async getDB() {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    return client.db("bemchat") // Changed from "cluster0" to "bemchat"
  }

  async getDB() {
    return Message.getDB()
  }
}
