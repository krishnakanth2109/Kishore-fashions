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

// --- 2. PRODUCTION-READY CORS CONFIGURATION ---
// Whitelist of allowed origins
const allowedOrigins = [
  'http://localhost:5173',                 // For Vite development
  'http://localhost:3000',                 // For Create React App development
  'http://localhost:8080',                 // <-- THE FIX: Added your specific local origin
  'https://kishorfashions.netlify.app/'  ,// Your deployed Netlify frontend
  'https://kishore-fashions.onrender.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman, mobile apps, or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS ERROR: The origin '${origin}' was blocked by the CORS policy.`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // Use the secure CORS options
app.use(express.json()); // Middleware to parse JSON bodies

// --- 3. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// --- 4. SEED ADMIN USER ON STARTUP ---
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
  } catch (error)
  {
    console.error("Error seeding admin user:", error);
  }
};
seedAdminUser();

// --- 5. CONNECT API ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);

// --- 6. ROOT ROUTE FOR HEALTH CHECK ---
app.get("/", (req, res) => {
  res.send("Elegant Stitches API is running...");
});


// --- 7. START THE SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running beautifully on port ${PORT}`));
