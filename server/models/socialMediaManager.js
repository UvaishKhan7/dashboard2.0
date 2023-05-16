import mongoose from 'mongoose';

const socialMediaManagerSchema = new mongoose.Schema(
    {
        userId: String,
        postDate: {
            type: Date,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        plateform: {
            type: String,
            required: true,
        }
    }
);

const SocialMediaManager = mongoose.model('SocialMediaManager', socialMediaManagerSchema);

export default SocialMediaManager;