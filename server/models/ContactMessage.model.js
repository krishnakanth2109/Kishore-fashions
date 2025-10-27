import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address."],
  },
  phone: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required."],
    trim: true,
  },
  isRead: {
    type: Boolean,
    default: false, // Useful for admins to track unread messages
  },
}, {
  // This option adds `createdAt` and `updatedAt` fields automatically
  timestamps: true,
});

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;