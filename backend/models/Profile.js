import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: { type: String },
  skills: [String],
  projects: [{
    title: { type: String, required: true },
    description: { type: String },
    links: {
      github: String,
      live: String,
      demo: String
    }
  }],
  work: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    description: String
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
}, { timestamps: true });
export default mongoose.model("Profile" , profileSchema)