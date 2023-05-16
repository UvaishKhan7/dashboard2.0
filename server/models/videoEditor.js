import mongoose from 'mongoose';

const videoEditorSchema = new mongoose.Schema(
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

const VideoEditor = mongoose.model('VideoEditor', videoEditorSchema);

export default VideoEditor;