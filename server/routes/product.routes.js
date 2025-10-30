import express from "express";
import Product from "../models/Product.model.js";
import upload from "../middleware/multer.middleware.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// CREATE a new product with image upload
router.post("/", upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }
    
    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    const newProduct = new Product({
      ...req.body,
      image: result.secure_url,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

// UPDATE a product by ID with optional new image
router.put("/:id", upload.single('image'), async (req, res) => {
  try {
    let imageUrl;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const updateData = {
      ...req.body,
    };
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

export default router;