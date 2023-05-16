import express from 'express';
import userModel from '../models/user.js';
import contentWriterModel from '../models/contentWriter.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Add a new contentWriter work entry for an user
router.post('/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const contentWriter = new contentWriterModel(req.body);
        const newcontentWriter = await contentWriter.save();
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.contentWriter.push(contentWriter._id);
        await user.save();
        res.send(newcontentWriter);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Update an existing contentWriter detail entry for a user
router.patch('/:contentWriterId', async (req, res) => {
    try {
        const contentWriter = await contentWriterModel.findByIdAndUpdate(
            req.params.contentWriterId,
            req.body,
        );
        if (!contentWriter) {
            return res.status(404).send({ error: 'Content Writer details not found' });
        }
        res.send(contentWriter);
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Content Writer detail ID' });
        }
        res.status(500).json({ message: err.message });
    }
});


// Get all contentWriter detail entries
router.get('/all', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const contentWriters = await contentWriterModel.find();
        res.send(contentWriters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get all contentWriter detail entries for an user
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Find all contentWriter detail for the user
        const contentWriters = await contentWriterModel.find({ userId });

        res.send(contentWriters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get a specific contentWriter detail entry for an user
router.get('/:contentWriterId', async (req, res) => {
    try {
        const contentWriter = await contentWriterModel.findById(req.params.contentWriterId);
        if (!contentWriter) {
            return res
                .status(404)
                .send({ error: 'Content Writer detail entry not found' });
        }
        res.send(contentWriter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a contentWriter detail entry for an user
router.delete('/:contentWriterId', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const contentWriter = await contentWriterModel.findByIdAndDelete(req.params.contentWriterId);
        if (!contentWriter) {
            return res.status(404).send({ error: 'Content Writer detail not found' });
        }

        // Remove the contentWriter._id from the contentWriters array of the user document
        await userModel.findOneAndUpdate({ _id: req.params.contentWriterId }, { $pull: { contentWriters: req.params.contentWriterId } });

        res.send({ message: "Details deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});


export default router;
