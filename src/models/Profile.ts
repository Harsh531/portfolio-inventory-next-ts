import mongoose from "mongoose"

const ExperienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startDate: String,
  endDate: String,
  description: String
})

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    bio: String,
    skills: [String],
    experience: [ExperienceSchema],
    resumeUrl: String
  },
  { timestamps: true }
)

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema)