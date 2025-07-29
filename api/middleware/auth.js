import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here-change-in-production"

// Middleware buat verify JWT tokennya
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token diperlukan",
    })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token tidak valid atau sudah expired",
      })
    }

    req.user = user
    next()
  })
}

// Optional authentication - Biar tidak gagal if no token
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user
      }
    })
  }

  next()
}
