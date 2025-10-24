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
  image: { 
    type: String, 
    required: [true, "Image URL is required"] 
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;