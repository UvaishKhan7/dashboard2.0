import mongoose from 'mongoose';

const developmentWorksSchema = new mongoose.Schema(
    {
        userId: String,
        project: {
            type: String,
            required: true
        },
        technologies: {
            type: String,
            required: true
        },
        startAt: {
            type: Date,
            required: true
        },
        finishedAt: {
            type: Date
        },
        issues: {
            type: String
        },
        feedback: {
            type: String
        }
    },
    { timestamps: true }
);

const DevelopmentWorks = mongoose.model('DevelopmentWorks', developmentWorksSchema);

export default DevelopmentWorks;