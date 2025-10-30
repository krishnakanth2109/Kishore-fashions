import express from "express";
import ContactInfo from "../models/ContactInfo.model.js";
import ContactMessage from "../models/ContactMessage.model.js";

const router = express.Router();

// ===============================
// CONTACT INFO ROUTES
// ===============================

// Get contact info
router.get("/info", async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findOne({});
    res.status(200).json(contactInfo || {});
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact info", error: error.message });
  }
});

// Update or create contact info
router.put("/info", async (req, res) => {
  try {
    const updatedInfo = await ContactInfo.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact info", error: error.message });
  }
});

// ===============================
// CONTACT FORM MESSAGE ROUTES
// ===============================

// Save message from public form
router.post("/message", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    const newMessage = new ContactMessage({
      name,
      email,
      phone,
      message,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json({
      message: "Your message has been sent successfully!",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Failed to send message.", error: error.message });
  }
});

// ===============================
// GET ALL MESSAGES (ADMIN SIDE)
// ===============================
router.get("/messages", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
});

// ===============================
// DELETE MESSAGE (Admin Side)
// ===============================
router.delete("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await ContactMessage.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error: error.message });
  }
});

export default router;