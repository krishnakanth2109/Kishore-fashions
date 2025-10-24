import mongoose from "mongoose";

const portfolioVideoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Title is required"] 
  },
  description: { 
    type: String, 
    required: [true, "Description is required"] 
  },
  embedUrl: { 
    type: String, 
    required: [true, "YouTube embed URL is required"] 
  },
});

const PortfolioVideo = mongoose.model("PortfolioVideo", portfolioVideoSchema);
export default PortfolioVideo;