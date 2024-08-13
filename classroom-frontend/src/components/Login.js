import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            history.push('/dashboard'); // Redirect to the appropriate dashboard
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
