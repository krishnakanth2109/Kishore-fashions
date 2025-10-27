import express from "express";
import ContactInfo from "../models/ContactInfo.model.js"; // Assuming this model exists for your /info route
import ContactMessage from "../models/ContactMessage.model.js"; // Import the new message model
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// --- ROUTE TO GET/UPDATE GENERAL CONTACT INFO ---
// This part of the file remains the same
router.get("/info", async (req, res) => {
  try {
    const info = await ContactInfo.findOne({});
    res.status(200).json(info || {});
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact info", error: error.message });
  }
});

router.put("/info", protect, async (req, res) => {
  try {
    const updatedInfo = await ContactInfo.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true, // This creates the document if it doesn't exist
      runValidators: true 
    });
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact info", error: error.message });
  }
});


// --- NEW ROUTE TO HANDLE CONTACT FORM SUBMISSIONS ---
// This is the new endpoint for your form
router.post("/message", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    // Create a new contact message instance
    const newContactMessage = new ContactMessage({
      name,
      email,
      phone,
      message,
    });

    // Save the message to the database
    const savedMessage = await newContactMessage.save();

    // Send a success response
    res.status(201).json({ 
      message: "Your message has been received successfully!", 
      data: savedMessage 
    });

  } catch (error) {
    // Handle validation or server errors
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Failed to send message.", error: error.message });
  }
});

export default router;