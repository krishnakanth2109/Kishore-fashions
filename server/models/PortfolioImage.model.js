import mongoose from "mongoose";

const portfolioImageSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Title is required"] 
  },
  description: { 
    type: String, 
    required: [true, "Description is required"] 
  },
  // 'src' matches the frontend component property
  src: { 
    type: String, 
    required: [true, "Image source URL is required"] 
  },
});

const PortfolioImage = mongoose.model("PortfolioImage", portfolioImageSchema);
export default PortfolioImage;