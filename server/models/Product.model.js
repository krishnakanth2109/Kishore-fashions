import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Title is required"] 
  },
  description: { 
    type: String, 
    required: [true, "Description is required"] 
  },
  price: { 
    type: Number, 
    required: [true, "Price is required"] 
  },
  mainImage: { 
    type: String, 
    required: [true, "Main image URL is required"] 
  },
  additionalImages: {
    type: [String],
    default: []
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;