import express from 'express';
import userModel from '../models/user.js';
import financeDetailsModel from '../models/financeDetails.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Add a new financeDetail work entry for an user
router.post('/', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const userId = req.body.userId;
        const financeDetail = new financeDetailsModel(req.body);
        const newfinanceDetail = await financeDetail.save();
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.financeDetails.push(financeDetail._id);
        await user.save();
        res.send(newfinanceDetail);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Update an existing Finance detail entry for a user
router.patch('/:financeDetailId', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const financeDetail = await financeDetailsModel.findByIdAndUpdate(
            req.params.financeDetailId,
            req.body,
        );
        if (!financeDetail) {
            return res.status(404).send({ error: 'Finance detail entry not found' });
        }
        res.send(financeDetail);
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid finance detail ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});


// Get all Finance detail entries
router.get('/all', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const financeDetails = await financeDetailsModel.find();
        res.send(financeDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get all Finance detail entries for an user
router.get('/', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const userId = req.query.userId;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Find all Finance detail for the user
        const financeDetails = await financeDetailsModel.find({ userId });

        res.send(financeDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get a specific Finance detail entry for an user
router.get('/:financeDetailId', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const financeDetail = await financeDetailsModel.findById(req.params.financeDetailId);
        if (!financeDetail) {
            return res
                .status(404)
                .send({ error: 'Finance detail entry not found' });
        }
        res.send(financeDetail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a Finance detail entry for an user
router.delete('/:financeDetailId', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const financeDetail = await financeDetailsModel.findByIdAndDelete(req.params.financeDetailId);
        if (!financeDetail) {
            return res.status(404).send({ error: 'Finance detail not found' });
        }

        // Remove the financeDetail._id from the financeDetails array of the user document
        await userModel.findOneAndUpdate({ _id: financeDetail.userId }, { $pull: { financeDetails: financeDetail._id } });

        res.send({ message: "Details deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});


export default router;
