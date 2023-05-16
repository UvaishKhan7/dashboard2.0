import mongoose from 'mongoose';

const contentWriterSchema = new mongoose.Schema(
    {
        userId: String,
        title: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
        },
    }
);

const ContentWriter = mongoose.model('ContentWriter', contentWriterSchema);

export default ContentWriter;