import express from "express";

const router = express.Router();

// Hardcoded admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "12345678";

// --- AUTHENTICATION ROUTE ---
// @route   POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Simple credential check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      res.status(200).json({ 
        email: email, 
        message: "Login successful" 
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;