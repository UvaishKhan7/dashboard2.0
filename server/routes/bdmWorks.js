import express from 'express';
import bdmWorksModel from '../models/bdmWorks.js';
import userModel from '../models/user.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Add a new BDM work entry for an user
router.post('/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const bdmWork = new bdmWorksModel(req.body);
        const newBdmWork = await bdmWork.save();
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.bdmWorks.push(bdmWork._id);
        await user.save();
        res.send(newBdmWork);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Update an existing BDM work entry for an user
router.patch('/:bdmworkId', async (req, res) => {
    try {
        const bdmWork = await bdmWorksModel.findByIdAndUpdate(
            req.params.bdmworkId,
            req.body
        );
        if (!bdmWork) {
            return res.status(404).send({ error: 'BDM work entry not found' });
        }
        res.send(bdmWork);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Get all BDM work entries
router.get('/all', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const bdmWorks = await bdmWorksModel.find();
        res.send(bdmWorks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get all BDM work entries for an user
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Find all BDM works for the user
        const bdmWorks = await bdmWorksModel.find({ userId });

        res.send(bdmWorks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get a specific BDM work entry for an user
router.get('/:bdmworkId', async (req, res) => {
    try {
        const bdmWork = await bdmWorksModel.findById(req.params.bdmworkId);
        if (!bdmWork) {
            return res
                .status(404)
                .send({ error: 'BDM work entry not found' });
        }
        res.send(bdmWork);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a BDM work entry for an user
router.delete('/:bdmworkId', async (req, res) => {
    try {
        const bdmWork = await bdmWorksModel.findByIdAndDelete(req.params.bdmworkId);
        if (!bdmWork) {
            return res.status(404).send({ error: 'BDM work not found' });
        }

        // Remove the bdmWork._id from the bdmWorks array of the user document
        await userModel.findOneAndUpdate({ _id: bdmWork.userId }, { $pull: { bdmWorks: bdmWork._id } });

        res.send({ message: "Details deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
