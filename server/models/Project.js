import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        clientName: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        clientId: String,
        email: {
            required: true,
            type: String,
            max: 50,
            unique: true,
        },
        phone: {
            type: String,
            min: 10,
            max: 10,
        },
        startDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        endDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;