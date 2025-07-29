import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcryptjs"

export default class User {
  constructor(userData) {
    this.username = userData.username
    this.password = userData.password
    this.createdAt = userData.createdAt || new Date()
    this.updatedAt = userData.updatedAt || new Date()
  }

  // Hash password 
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    }
  }

  // Compare password dari user
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
  }

  // Save user ke database
  async save() {
    const db = await this.getDB()
    const usersCollection = db.collection("users")

    // Hash password 
    await this.hashPassword()

    const result = await usersCollection.insertOne({
      username: this.username,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    })

    return result
  }

  // Find user by username
  static async findByUsername(username) {
    const db = await User.getDB()
    const usersCollection = db.collection("users")
    return await usersCollection.findOne({ username })
  }

  // Find user by ID
  static async findById(id) {
    const db = await User.getDB()
    const usersCollection = db.collection("users")
    return await usersCollection.findOne({ _id: new ObjectId(id) })
  }

  // Check if username exists
  static async usernameExists(username) {
    const user = await User.findByUsername(username)
    return !!user
  }

  // Get database connection
  static async getDB() {
const client = await MongoClient.connect(process.env.MONGODB_URI)
    return client.db("cluster0")
  }

  async getDB() {
    return User.getDB()
  }
}
