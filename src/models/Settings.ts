import mongoose from "mongoose"

const SettingsSchema = new mongoose.Schema({
  theme: {
    type: String,
    enum: ["light", "dark", "system"],
    default: "system"
  },
  portfolioVisible: {
    type: Boolean,
    default: true
  }
})

export default mongoose.models.Settings ||
  mongoose.model("Settings", SettingsSchema)