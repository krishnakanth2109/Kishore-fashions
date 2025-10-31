import express from "express";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env before using environment variables

const router = express.Router();

// Admin credentials from .env file
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// --- AUTHENTICATION ROUTE ---
// @route   POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {
    // Simple credential check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      res.status(200).json({
        email,
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
