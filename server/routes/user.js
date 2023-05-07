import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// login user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(req.body.email)
        if (!user) {
            return res.status(401).json({ msg: 'user does not exist!' });
        }
        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password) {
            return res.status(401).json({ msg: 'Incorrect password!' });
        }
        const token = jwt.sign({
            name: user.name,
            role: user.role,
            email: user.email,
            phoneNumber: user.phoneNumber,
            id: user._id,
            photo: user.photo,
            position: user.position,
        }, 'blackpearl', { expiresIn: "24h" });
        res.status(200).json({
            name: user.name,
            role: user.role,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: token,
            id: user._id,
            photo: user.photo,
            position: user.position,
        });
    } catch (error) {
        res.status(500).json({ msg: 'Login failed!', error: error });
    }
});

// Get all user
router.get('/', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific user by id
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Create a new user
router.post('/', checkAuth('superadmin' || 'admin'), async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            employeeId: req.body.employeeId,
            password: hashedPassword,
            position: req.body.position,
            phone: req.body.phone,
            address: req.body.address,
            photo: req.body.photo,
            role: req.body.role,
            status: req.body.status,
            doj: req.body.doj,
            timestamps: true
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update an existing user
router.patch('/:id', getUser, async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...update } = req.body;
        if (password !== undefined) {
            update.password = await bcrypt.hash(password, 10);
        }
        if (update.bdmWorks) {
            update.bdmWorks = update.bdmWorks._id; // Store only the _id of bdmWorks
        }
        if (update.developmentWorks) {
            update.developmentWorks = update.developmentWorks._id; // Store only the _id of developmentWorks
        }
        const user = await User.findByIdAndUpdate(id, update, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Middleware function to get an user by id
async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find User' });
        }
        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export default router;
