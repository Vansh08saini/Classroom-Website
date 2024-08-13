const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Principal initial setup
const principalEmail = "principal@classroom.com";
const principalPassword = "Admin";

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Initial setup for Principal
router.post('/setup', async (req, res) => {
    try {
        let principal = await User.findOne({ email: principalEmail });
        if (!principal) {
            principal = new User({
                email: principalEmail,
                password: principalPassword,
                role: 'Principal',
            });
            await principal.save();
            res.json({ message: 'Principal account created' });
        } else {
            res.json({ message: 'Principal account already exists' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
