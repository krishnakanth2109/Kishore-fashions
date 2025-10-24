import multer from "multer";

// We use memoryStorage to temporarily hold the file buffer before uploading to Cloudinary
const storage = multer.memoryStorage();

// Middleware to handle single file uploads
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB file size limit
});

export default upload;