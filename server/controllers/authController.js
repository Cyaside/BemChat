import jwt from "jsonwebtoken"
import User from "../models/user.js"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here-change-in-production"

class AuthController {
  // Register new user
  static async register(req, res) {
    try {
      const { username, password } = req.body

      // Validation
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username dan password harus diisi",
        })
      }

      if (username.length < 3) {
        return res.status(400).json({
          success: false,
          message: "Username minimal 3 karakter",
        })
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password minimal 6 karakter",
        })
      }

      // Check if username already exists
      const existingUser = await User.findByUsername(username)
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username sudah digunakan",
        })
      }

      // Create new user
      const newUser = new User({ username, password })
      const result = await newUser.save()

      res.status(201).json({
        success: true,
        message: "Registrasi berhasil! Silakan login.",
        userId: result.insertedId,
      })
    } catch (error) {
      console.error("Register error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { username, password } = req.body

      // Validation
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username dan password harus diisi",
        })
      }

      // Find user
      const user = await User.findByUsername(username)
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Username atau password salah",
        })
      }

      // Create user instance to access methods
      const userInstance = new User(user)

      // Check password
      const isPasswordValid = await userInstance.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Username atau password salah",
        })
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
      )

      // Return user data and token
      res.json({
        success: true,
        message: "Login berhasil",
        user: {
          id: user._id,
          username: user.username,
          createdAt: user.createdAt,
        },
        token,
      })
    } catch (error) {
      console.error("Login error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }

  // Get current user profile
  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        })
      }

      res.json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          createdAt: user.createdAt,
        },
      })
    } catch (error) {
      console.error("Get profile error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }

  // Verify token endpoint
  static async verifyToken(req, res) {
    try {
      const user = await User.findById(req.user.userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        })
      }

      res.json({
        success: true,
        valid: true,
        user: {
          id: user._id,
          username: user.username,
          createdAt: user.createdAt,
        },
      })
    } catch (error) {
      console.error("Verify token error:", error)
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      })
    }
  }
}

export default AuthController
