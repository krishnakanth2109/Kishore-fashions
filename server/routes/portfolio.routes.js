import express from "express";
import PortfolioImage from "../models/PortfolioImage.model.js";
import PortfolioVideo from "../models/PortfolioVideo.model.js";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js"; // Import multer
import { uploadToCloudinary } from "../config/cloudinary.js"; // Import cloudinary helper

const router = express.Router();

// --- PORTFOLIO IMAGE ROUTES (with file upload) ---
router.get("/images", async (req, res) => {
  const images = await PortfolioImage.find({});
  res.status(200).json(images);
});

router.post("/images", protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image file is required" });
    const result = await uploadToCloudinary(req.file.buffer);
    const newImage = new PortfolioImage({
      ...req.body,
      src: result.secure_url,
    });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio image", error });
  }
});

router.put("/images/:id", protect, upload.single('image'), async (req, res) => {
    try {
        let imageUrl;
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }
        const updateData = { ...req.body };
        if (imageUrl) updateData.src = imageUrl;
        
        const updatedImage = await PortfolioImage.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedImage) return res.status(404).json({ message: "Image not found" });
        res.status(200).json(updatedImage);
    } catch (error) {
        res.status(500).json({ message: "Error updating portfolio image", error });
    }
});

router.delete("/images/:id", protect, async (req, res) => {
    const deletedImage = await PortfolioImage.findByIdAndDelete(req.params.id);
    if (!deletedImage) return res.status(404).json({ message: "Image not found" });
    res.status(200).json({ message: "Image deleted successfully" });
});


// --- PORTFOLIO VIDEO ROUTES (No changes needed here) ---
router.get("/videos", async (req, res) => {
  const videos = await PortfolioVideo.find({});
  res.status(200).json(videos);
});

router.post("/videos", protect, async (req, res) => {
  const newVideo = new PortfolioVideo(req.body);
  const savedVideo = await newVideo.save();
  res.status(201).json(savedVideo);
});

router.put("/videos/:id", protect, async (req, res) => {
  const updatedVideo = await PortfolioVideo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedVideo) return res.status(404).json({ message: "Video not found" });
  res.status(200).json(updatedVideo);
});

router.delete("/videos/:id", protect, async (req, res) => {
  const deletedVideo = await PortfolioVideo.findByIdAndDelete(req.params.id);
  if (!deletedVideo) return res.status(404).json({ message: "Video not found" });
  res.status(200).json({ message: "Video deleted successfully" });
});

export default router;