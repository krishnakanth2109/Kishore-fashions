import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema({
  phone1: String,
  phone2: String,
  email1: String,
  email2: String,
  address: String,
  whatsappNumber: String,
});

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
export default ContactInfo;