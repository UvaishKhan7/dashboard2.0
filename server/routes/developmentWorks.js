// Import necessary modules and models
import express from 'express';
import developmentWorksModel from '../models/developmentWorks.js';
import userModel from '../models/user.js';

const router = express.Router();

// Add a new development work entry for an user
router.post('/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const developmentWork = new developmentWorksModel(req.body);
        await developmentWork.save();
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.developmentWorks.push(developmentWork._id);
        await user.save();
        res.send(developmentWork);
    } catch (err) {
        res.status(500).send(err);
        res.status(400).send({ error: 'Invalid input data' });
    }
});

// Update an existing development work entry for an user
router.patch('/:developmentWorkId', async (req, res) => {
    try {
        const developmentWork = await developmentWorksModel.findByIdAndUpdate(req.params.developmentWorkId, req.body);
        if (!bdmWork) {
            return res.status(404).send({ error: 'BDM work entry not found' });
        }
        res.send(developmentWork);
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Invalid input data' });
    }
});

// Get all development work entries for an user
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        // Find all development works for the user
        const developmentWorks = await developmentWorksModel.find({ userId });

        res.send(developmentWorks);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Get a specific development work entry for an user
router.get('/:developmentWorkId', async (req, res) => {
    try {
        const developmentWork = await developmentWorksModel.findById(req.params.developmentWorkId);
        if (!developmentWork) {
            return res
                .status(404)
                .send({ error: 'development work entry not found' });
        }
        res.send(developmentWork);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Delete a development work entry for an user
router.delete('/:developmentWorkId', async (req, res) => {
    try {
        const developmentWork = await developmentWorksModel.findByIdAndDelete(req.params.developmentWorkId);
        if (!developmentWork) {
            return res.status(404).send({ error: 'development work not found' });
        }
        res.send(developmentWork);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;