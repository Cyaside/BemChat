import express from "express"
import AuthController from "../../controllers/authController.js"
import { authenticateToken } from "../../middleware/auth.js"

const router = express.Router()

// POST /api/auth/register
router.post("/register", AuthController.register)

// POST /api/auth/login
router.post("/login", AuthController.login)

// GET /api/auth/profile - Protected route
router.get("/profile", authenticateToken, AuthController.getProfile)

// GET /api/auth/verify - Verify token
router.get("/verify", authenticateToken, AuthController.verifyToken)

export default router
