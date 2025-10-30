import express from "express";
import PortfolioImage from "../models/PortfolioImage.model.js";
import PortfolioVideo from "../models/PortfolioVideo.model.js";
import upload from "../middleware/multer.middleware.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

const router = express.Router();

// Helper function to validate and normalize YouTube URLs
const normalizeYouTubeUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, embedUrl: '', error: 'URL is required' };
  }

  try {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    let videoId = null;
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        videoId = match[1];
        break;
      }
    }

    if (!videoId) {
      return { 
        isValid: false, 
        embedUrl: '', 
        error: 'Invalid YouTube URL format' 
      };
    }

    return { 
      isValid: true, 
      embedUrl: `https://www.youtube.com/embed/${videoId}` 
    };
  } catch (error) {
    return { 
      isValid: false, 
      embedUrl: '', 
      error: 'Invalid URL format' 
    };
  }
};

// --- PORTFOLIO IMAGE ROUTES ---
router.get("/images", async (req, res) => {
  try {
    const images = await PortfolioImage.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio images", error: error.message });
  }
});

router.post("/images", upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    
    const result = await uploadToCloudinary(req.file.buffer);
    const newImage = new PortfolioImage({
      ...req.body,
      src: result.secure_url,
    });
    
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio image", error: error.message });
  }
});

router.put("/images/:id", upload.single('image'), async (req, res) => {
  try {
    let imageUrl;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }
    
    const updateData = { ...req.body };
    if (imageUrl) updateData.src = imageUrl;
    
    const updatedImage = await PortfolioImage.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: "Error updating portfolio image", error: error.message });
  }
});

router.delete("/images/:id", async (req, res) => {
  try {
    const deletedImage = await PortfolioImage.findByIdAndDelete(req.params.id);
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting portfolio image", error: error.message });
  }
});

// --- PORTFOLIO VIDEO ROUTES ---
router.get("/videos", async (req, res) => {
  try {
    const videos = await PortfolioVideo.find({});
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio videos", error: error.message });
  }
});

router.post("/videos", async (req, res) => {
  try {
    const { title, description, embedUrl } = req.body;
    
    if (!title || !description || !embedUrl) {
      return res.status(400).json({ 
        message: "Title, description, and YouTube URL are required" 
      });
    }
    
    const validation = normalizeYouTubeUrl(embedUrl);
    if (!validation.isValid) {
      return res.status(400).json({ 
        message: validation.error || "Invalid YouTube URL" 
      });
    }
    
    const newVideo = new PortfolioVideo({
      title,
      description,
      embedUrl: validation.embedUrl
    });
    
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating portfolio video", 
      error: error.message 
    });
  }
});

router.put("/videos/:id", async (req, res) => {
  try {
    const { title, description, embedUrl } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    
    if (embedUrl) {
      const validation = normalizeYouTubeUrl(embedUrl);
      if (!validation.isValid) {
        return res.status(400).json({ 
          message: validation.error || "Invalid YouTube URL" 
        });
      }
      updateData.embedUrl = validation.embedUrl;
    }
    
    const updatedVideo = await PortfolioVideo.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating portfolio video", 
      error: error.message 
    });
  }
});

router.delete("/videos/:id", async (req, res) => {
  try {
    const deletedVideo = await PortfolioVideo.findByIdAndDelete(req.params.id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting portfolio video", 
      error: error.message 
    });
  }
});

export default router;