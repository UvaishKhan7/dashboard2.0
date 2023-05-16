import express from 'express';
import userModel from '../models/user.js';
import leavesModel from '../models/leaves.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Add a new leave work entry for an user
router.post('/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const leave = new leavesModel(req.body);
        const newleave = await leave.save();
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.leaves.push(leave._id);
        await user.save();
        res.send(newleave);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Update an existing Leave detail entry for a user
router.patch('/:leaveId', async (req, res) => {
    try {
        const leave = await leavesModel.findByIdAndUpdate(
            req.params.leaveId,
            req.body,
        );
        if (!leave) {
            return res.status(404).send({ error: 'Leave details not found' });
        }
        res.send(leave);
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Leave detail ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});


// Get all Leave detail entries
router.get('/all', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const leaves = await leavesModel.find();
        res.send(leaves);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get all Leave detail entries for an user
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Find all Leave detail for the user
        const leaves = await leavesModel.find({ userId });

        res.send(leaves);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get a specific Leave detail entry for an user
router.get('/:leaveId', async (req, res) => {
    try {
        const leave = await leavesModel.findById(req.params.leaveId);
        if (!leave) {
            return res
                .status(404)
                .send({ error: 'Leave detail entry not found' });
        }
        res.send(leave);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a Leave detail entry for an user
router.delete('/:leaveId', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const leave = await leavesModel.findByIdAndDelete(req.params.leaveId);
        if (!leave) {
            return res.status(404).send({ error: 'Leave detail not found' });
        }

        // Remove the leave._id from the leaves array of the user document
        await userModel.findOneAndUpdate({ _id: req.params.leaveId }, { $pull: { leaves: req.params.leaveId } });

        res.send({ message: "Details deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});


export default router;
