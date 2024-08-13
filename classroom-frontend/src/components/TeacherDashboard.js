import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get('/api/teacher/students');
            setStudents(response.data);
        };
        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Teacher Dashboard</h1>

            <h2>Students in your Classroom</h2>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>{student.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherDashboard;
