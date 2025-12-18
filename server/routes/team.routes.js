import express from "express";
import multer from "multer";
import Team from "../models/Team.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js"; // Ensure this path is correct

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// --- 1. UPLOAD IMAGE ---
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file provided" });
    const result = await uploadToCloudinary(req.file.buffer);
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

// --- 2. GET ALL MEMBERS ---
router.get("/", async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team", error });
  }
});

// --- 3. ADD MEMBER ---
router.post("/", async (req, res) => {
  try {
    const newMember = new Team(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: "Error adding member", error });
  }
});

// --- 4. UPDATE MEMBER ---
router.put("/:id", async (req, res) => {
  try {
    const updatedMember = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: "Error updating member", error });
  }
});

// --- 5. DELETE MEMBER ---
router.delete("/:id", async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error });
  }
});

export default router;