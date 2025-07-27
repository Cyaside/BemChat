import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"

// Import routes
import auth from "./routes/api/auth.js"

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
)

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Routes

app.use("/api/auth", auth)

const port = process.env.PORT || 5000

app.listen(port, () => {
})
