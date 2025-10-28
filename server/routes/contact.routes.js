import express from "express";
import ContactInfo from "../models/ContactInfo.model.js";
import ContactMessage from "../models/ContactMessage.model.js"; // CORRECT: Use the better model
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// --- 1. ROUTES FOR GENERAL CONTACT INFORMATION (for display on the page) ---

// GET the single contact info document
router.get("/info", async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findOne({});
    res.status(200).json(contactInfo || {}); // Return empty object if not found
  } catch (error) {
    console.error("Error fetching contact info:", error);
    res.status(500).json({ message: "Error fetching contact info", error: error.message });
  }
});

// UPDATE (or create) the contact info (Admin protected)
router.put("/info", protect, async (req, res) => {
  try {
    const updatedInfo = await ContactInfo.findOneAndUpdate({}, req.body, {
      new: true, // Return the updated document
      upsert: true, // Create the document if it doesn't exist
      runValidators: true
    });
    res.status(200).json(updatedInfo);
  } catch (error) {
    console.error("Error updating contact info:", error);
    res.status(500).json({ message: "Error updating contact info", error: error.message });
  }
});


// --- 2. ROUTE FOR HANDLING THE PUBLIC CONTACT FORM SUBMISSION ---

// POST a new message from a user
router.post("/message", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required fields." });
    }

    // Create a new document using the detailed ContactMessage model
    const newContactMessage = new ContactMessage({
      name,
      email,
      phone,
      message,
    });

    const savedMessage = await newContactMessage.save();

    res.status(201).json({ 
      message: "Your message has been received successfully!", 
      data: savedMessage 
    });

  } catch (error) {
    // This will catch validation errors from the Mongoose model as well
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Failed to send message.", error: error.message });
  }
});

export default router;