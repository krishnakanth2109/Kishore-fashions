import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema({
  image: { type: String, required: true },
  heading: { type: String, required: true },
  paragraph: { type: String, required: true }
});

const aboutSchema = new mongoose.Schema({
  founderImage: { 
    type: String, 
    default: "https://image2url.com/images/1761557853213-99509f6b-ecb4-49a2-a17a-eb17fb833d80.jpg" 
  },
  successStories: [successStorySchema]
}, { timestamps: true });

const About = mongoose.model("About", aboutSchema);
export default About;