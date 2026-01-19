
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        techStack: [String],
        images: [String],
        githubUrl: String,
        liveUrl: String,
        challenges: String,
        learnings: String
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Project || mongoose.model("Project", projectSchema);