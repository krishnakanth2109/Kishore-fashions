import express from "express";
import ContactInfo from "../models/ContactInfo.model.js";
import Message from "../models/Message.model.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// --- CONTACT INFORMATION & MESSAGES ROUTES ---

// GET the single contact info document
router.get("/info", async (req, res) => {
  const contactInfo = await ContactInfo.findOne({});
  res.status(200).json(contactInfo || {}); // Return empty object if not found
});

// UPDATE (or create if it doesn't exist) the contact info
router.put("/info", protect, async (req, res) => {
  const updatedInfo = await ContactInfo.findOneAndUpdate({}, req.body, {
    new: true, // Return the updated document
    upsert: true, // Create the document if it doesn't exist
  });
  res.status(200).json(updatedInfo);
});

// Route for public users to send a message
router.post("/message", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Failed to send message.", error: error.message });
  }
});

export default router;