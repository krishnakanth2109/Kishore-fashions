import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  address: { type: String, required: true, trim: true }, // Will act as Role/Designation
  content: { type: String, required: true, trim: true }, // The quote/testimonial
  description: { type: String, required: true, trim: true } // The footer text (e.g., "Client for 5 years")
}, { timestamps: true });

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
export default Team;