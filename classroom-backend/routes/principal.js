const express = require('express');
const Classroom = require('../models/Classroom');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create Classroom
router.post('/classroom', authMiddleware('Principal'), async (req, res) => {
    const { name, startTime, endTime, days } = req.body;
    try {
        const classroom = new Classroom({ name, startTime, endTime, days });
        await classroom.save();
        res.status(201).json(classroom);
    } catch (err) {
        res.status(400).json({ message: 'Error creating classroom' });
    }
});

// Assign teacher to classroom
router.put('/classroom/:id/assign-teacher', authMiddleware('Principal'), async (req, res) => {
    const { teacherId } = req.body;
    try {
        const classroom = await Classroom.findById(req.params.id);
        classroom.teacher = teacherId;
        await classroom.save();

        const teacher = await User.findById(teacherId);
        teacher.classroom = classroom._id;
        await teacher.save();

        res.json(classroom);
    } catch (err) {
        res.status(400).json({ message: 'Error assigning teacher to classroom' });
    }
});

// Get list of Teachers and Students
router.get('/users', authMiddleware('Principal'), async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' }).populate('classroom');
        const students = await User.find({ role: 'Student' }).populate('classroom');
        res.json({ teachers, students });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

module.exports = router;
