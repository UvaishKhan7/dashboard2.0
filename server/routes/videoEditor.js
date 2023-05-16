import express from 'express';
import userModel from '../models/user.js';
import videoEditorModel from '../models/videoEditor.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Add a new videoEditor work entry for an user
router.post('/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const videoEditor = new videoEditorModel(req.body);
        const newvideoEditor = await videoEditor.save();
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.videoEditor.push(videoEditor._id);
        await user.save();
        res.send(newvideoEditor);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Update an existing videoEditor detail entry for a user
router.patch('/:videoEditorId', async (req, res) => {
    try {
        const videoEditor = await videoEditorModel.findByIdAndUpdate(
            req.params.videoEditorId,
            req.body,
        );
        if (!videoEditor) {
            return res.status(404).send({ error: 'Video Editor details not found' });
        }
        res.send(videoEditor);
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Video Editor detail ID' });
        }
        res.status(500).json({ message: err.message });
    }
});


// Get all videoEditor detail entries
router.get('/all', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const videoEditors = await videoEditorModel.find();
        res.send(videoEditors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get all videoEditor detail entries for an user
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Find all videoEditor detail for the user
        const videoEditors = await videoEditorModel.find({ userId });

        res.send(videoEditors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get a specific videoEditor detail entry for an user
router.get('/:videoEditorId', async (req, res) => {
    try {
        const videoEditor = await videoEditorModel.findById(req.params.videoEditorId);
        if (!videoEditor) {
            return res
                .status(404)
                .send({ error: 'Video Editor detail entry not found' });
        }
        res.send(videoEditor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a videoEditor detail entry for an user
router.delete('/:videoEditorId', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const videoEditor = await videoEditorModel.findByIdAndDelete(req.params.videoEditorId);
        if (!videoEditor) {
            return res.status(404).send({ error: 'Video Editor detail not found' });
        }

        // Remove the videoEditor._id from the videoEditors array of the user document
        await userModel.findOneAndUpdate({ _id: req.params.videoEditorId }, { $pull: { videoEditors: req.params.videoEditorId } });

        res.send({ message: "Details deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});


export default router;
