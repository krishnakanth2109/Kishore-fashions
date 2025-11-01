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

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = [            // For Vite development
  'http://localhost:3000',                 // For Create React App development
  'http://localhost:8080',                 // <-- THE FIX: Added your specific local origin
  'https://kishore-fashions-1.onrender.com/'  ,// Your deployed Netlify frontend
  'https://kishore-fashions-2z6j.onrender.com',
  "https://kishorfashions.netlify.app/"
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
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI)
  } catch (error) {
    console.log(error)
  }
}
dbConnection()

mongoose.connection.once('open', () => {
  console.log('MongoDb Connected')
})

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
