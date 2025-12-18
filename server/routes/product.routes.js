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

// CREATE a new product with multiple image uploads
router.post("/", upload.array('images', 7), async (req, res) => { // 1 main + 6 additional = 7 max
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image file is required." });
    }

    // Upload all images to Cloudinary
    const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
    const results = await Promise.all(uploadPromises);

    // First image is main image, rest are additional images
    const mainImage = results[0].secure_url;
    const additionalImages = results.slice(1).map(result => result.secure_url);

    const newProduct = new Product({
      ...req.body,
      mainImage,
      additionalImages
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

// UPDATE a product by ID with optional new images
router.put("/:id", upload.array('images', 7), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let mainImage = product.mainImage;
    let additionalImages = [...product.additionalImages];

    // If new images are uploaded
    if (req.files && req.files.length > 0) {
      // Upload new images to Cloudinary
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      const results = await Promise.all(uploadPromises);
      const uploadedUrls = results.map(result => result.secure_url);

      // If there's a new main image, use it
      if (uploadedUrls.length > 0) {
        mainImage = uploadedUrls[0];
        additionalImages = [...uploadedUrls.slice(1)];
      }
    }

    const updateData = {
      ...req.body,
      mainImage,
      additionalImages
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );

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