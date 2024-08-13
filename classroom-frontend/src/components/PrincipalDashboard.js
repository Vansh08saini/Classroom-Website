import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrincipalDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [classroomName, setClassroomName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [days, setDays] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/principal/users');
            setTeachers(response.data.teachers);
            setStudents(response.data.students);
        };
        fetchData();
    }, []);

    const handleCreateClassroom = async () => {
        try {
            await axios.post('/api/principal/classroom', {
                name: classroomName,
                startTime,
                endTime,
                days: days.split(','),
            });
            // Refresh classroom list or handle UI update
        } catch (error) {
            console.error('Error creating classroom', error);
        }
    };

    return (
        <div>
            <h1>Principal Dashboard</h1>

            <h2>Create Classroom</h2>
            <input
                type="text"
                placeholder="Classroom Name"
                value={classroomName}
                onChange={(e) => setClassroomName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Start Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <input
                type="text"
                placeholder="End Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
            <input
                type="text"
                placeholder="Days (comma separated)"
                value={days}
                onChange={(e) => setDays(e.target.value)}
            />
            <button onClick={handleCreateClassroom}>Create Classroom</button>

            <h2>Teachers</h2>
            <ul>
                {teachers.map((teacher) => (
                    <li key={teacher._id}>{teacher.email} - {teacher.classroom ? teacher.classroom.name : 'Unassigned'}</li>
                ))}
            </ul>

            <h2>Students</h2>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>{student.email} - {student.classroom.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PrincipalDashboard;
