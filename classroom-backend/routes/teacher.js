const express = require('express');
const User = require('../models/User');
const Classroom = require('../models/Classroom');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get students in the teacher's classroom
router.get('/students', authMiddleware('Teacher'), async (req, res) => {
    try {
        const teacher = await User.findById(req.user.id).populate('classroom');
        const students = await User.find({ classroom: teacher.classroom._id });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving students' });
    }
});

module.exports = router;
