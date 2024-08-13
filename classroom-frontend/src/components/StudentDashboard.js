import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
    const [classmates, setClassmates] = useState([]);

    useEffect(() => {
        const fetchClassmates = async () => {
            const response = await axios.get('/api/student/classmates');
            setClassmates(response.data);
        };
        fetchClassmates();
    }, []);

    return (
        <div>
            <h1>Student Dashboard</h1>

            <h2>Your Classmates</h2>
            <ul>
                {classmates.map((classmate) => (
                    <li key={classmate._id}>{classmate.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentDashboard;
