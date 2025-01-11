// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook untuk navigasi

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const newUser = { username, password };
            await axios.post('http://192.168.43.154:8080/users/add', newUser);
            setMessage('Registration successful!'); // Tampilkan pesan sukses
            setTimeout(() => {
                navigate('/login'); // Arahkan kembali ke halaman login setelah 2 detik
            }, 2000);
        } catch (error) {
            console.error('Error registering user:', error);
            if (error.response) {
                setMessage(`Error: ${error.response.status} - ${error.response.data}`);
            } else {
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Register;
