import express from "express";
import ContactInfo from "../models/ContactInfo.model.js";
<<<<<<< HEAD
import ContactMessage from "../models/ContactMessage.model.js"; // CORRECT: Use the better model
=======
import ContactMessage from "../models/ContactMessage.model.js"; // Use this instead of Message
>>>>>>> b5925cd215a96d89f41e648a2e644a90b47c8de6
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

<<<<<<< HEAD
// --- 1. ROUTES FOR GENERAL CONTACT INFORMATION (for display on the page) ---
=======
// ===============================
// CONTACT INFO ROUTES
// ===============================
>>>>>>> b5925cd215a96d89f41e648a2e644a90b47c8de6

// Get contact info
router.get("/info", async (req, res) => {
<<<<<<< HEAD
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
=======
  try {
    const contactInfo = await ContactInfo.findOne({});
    res.status(200).json(contactInfo || {});
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact info", error: error.message });
>>>>>>> b5925cd215a96d89f41e648a2e644a90b47c8de6
  }
});

// Update or create contact info
router.put("/info", protect, async (req, res) => {
  try {
    const updatedInfo = await ContactInfo.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // Create if doesn't exist
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

    // Basic validation
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
router.get("/messages", protect, async (req, res) => {
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
