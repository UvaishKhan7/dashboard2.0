import express from 'express';
import bdmWorksModel from '../models/bdmWorks.js';
import userModel from '../models/user.js';

const router = express.Router();

// Add a new BDM work entry for an user
router.post('/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const bdmWork = new bdmWorksModel(req.body);
        await bdmWork.save();
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.bdmWorks.push(bdmWork._id);
        await user.save();
        res.send(bdmWork);
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Invalid input data' });
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
        res.status(400).send({ error: 'Invalid input data' });
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
        res.status(500).send({ error: 'Internal server error' });
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
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Delete a BDM work entry for an user
router.delete('/:bdmworkId', async (req, res) => {
    try {
        const bdmWork = await bdmWorksModel.findByIdAndDelete(req.params.bdmworkId);
        if (!bdmWork) {
            return res.status(404).send({ error: 'BDM work not found' });
        }
        res.send(bdmWork);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
