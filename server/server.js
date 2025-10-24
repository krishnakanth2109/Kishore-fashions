import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import the user model for seeding
import User from "./models/User.model.js";

// Import all route files
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import contactRoutes from "./routes/contact.routes.js";

// --- 1. INITIAL SERVER SETUP ---
dotenv.config();
const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON bodies

// --- 2. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// --- 3. SEED ADMIN USER ON STARTUP ---
const seedAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: "kishorfashions1@gmail.com" });
    if (!adminExists) {
      await User.create({
        email: "kishorfashions1@gmail.com",
        password: "password123",
      });
      console.log("Admin user has been created.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
seedAdminUser();

// --------------------------------------------------
// --- 4. CONNECT API ROUTES ---
// --------------------------------------------------
// All requests to /api/auth will be handled by authRoutes
app.use("/api/auth", authRoutes);

// All requests to /api/products will be handled by productRoutes
app.use("/api/products", productRoutes);

// All requests to /api/portfolio will be handled by portfolioRoutes
app.use("/api/portfolio", portfolioRoutes);

// All requests to /api/contact will be handled by contactRoutes
app.use("/api/contact", contactRoutes);


// --- 5. START THE SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running beautifully on port ${PORT}`));