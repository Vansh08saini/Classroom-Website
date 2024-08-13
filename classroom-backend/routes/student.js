const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get classmates
router.get('/classmates', authMiddleware('Student'), async (req, res) => {
    try {
        const student = await User.findById(req.user.id).populate('classroom');
        const classmates = await User.find({ classroom: student.classroom._id, _id: { $ne: req.user.id } });
        res.json(classmates);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving classmates' });
    }
});

module.exports = router;
