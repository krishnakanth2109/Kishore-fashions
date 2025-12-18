import express from "express";
import multer from "multer"; // Make sure to npm install multer
import About from "../models/About.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js"; // Adjust path if needed

const router = express.Router();

// Configure Multer for memory storage (buffers)
const upload = multer({ storage: multer.memoryStorage() });

// --- 1. UPLOAD ENDPOINT ---
// POST /api/about/upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);
    
    // Return the secure URL
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
});

// --- 2. GET DATA ---
router.get("/", async (req, res) => {
  try {
    let aboutData = await About.findOne();
    if (!aboutData) {
      aboutData = new About({ successStories: [] });
      await aboutData.save();
    }
    res.json(aboutData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about data", error });
  }
});

// --- 3. UPDATE DATA (JSON) ---
// This remains the same, accepting URLs strings
router.put("/", async (req, res) => {
  const { founderImage, successStories } = req.body;
  try {
    const updatedAbout = await About.findOneAndUpdate(
      {}, 
      { founderImage, successStories }, 
      { new: true, upsert: true }
    );
    res.json(updatedAbout);
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
});

export default router;