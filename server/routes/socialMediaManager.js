import express from 'express';
import userModel from '../models/user.js';
import socialMediaManagerModel from '../models/socialMediaManager.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Add a new socialMediaManager work entry for an user
router.post('/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const socialMediaManager = new socialMediaManagerModel(req.body);
        const newsocialMediaManager = await socialMediaManager.save();
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.socialMediaManager.push(socialMediaManager._id);
        await user.save();
        res.send(newsocialMediaManager);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Update an existing socialMediaManager detail entry for a user
router.patch('/:socialMediaManagerId', async (req, res) => {
    try {
        const socialMediaManager = await socialMediaManagerModel.findByIdAndUpdate(
            req.params.socialMediaManagerId,
            req.body,
        );
        if (!socialMediaManager) {
            return res.status(404).send({ error: 'Social Media Manager details not found' });
        }
        res.send(socialMediaManager);
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Social Media Manager detail ID' });
        }
        res.status(500).json({ message: err.message });
    }
});


// Get all socialMediaManager detail entries
router.get('/all', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const socialMediaManagers = await socialMediaManagerModel.find();
        res.send(socialMediaManagers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get all socialMediaManager detail entries for an user
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Find all socialMediaManager detail for the user
        const socialMediaManagers = await socialMediaManagerModel.find({ userId });

        res.send(socialMediaManagers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get a specific socialMediaManager detail entry for an user
router.get('/:socialMediaManagerId', async (req, res) => {
    try {
        const socialMediaManager = await socialMediaManagerModel.findById(req.params.socialMediaManagerId);
        if (!socialMediaManager) {
            return res
                .status(404)
                .send({ error: 'Social Media Manager detail entry not found' });
        }
        res.send(socialMediaManager);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a socialMediaManager detail entry for an user
router.delete('/:socialMediaManagerId', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const socialMediaManager = await socialMediaManagerModel.findByIdAndDelete(req.params.socialMediaManagerId);
        if (!socialMediaManager) {
            return res.status(404).send({ error: 'Social Media Manager detail not found' });
        }

        // Remove the socialMediaManager._id from the socialMediaManagers array of the user document
        await userModel.findOneAndUpdate({ _id: req.params.socialMediaManagerId }, { $pull: { socialMediaManagers: req.params.socialMediaManagerId } });

        res.send({ message: "Details deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});


export default router;
