// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:8080/users/login', { username, password });

            if (response.status === 200) {
                setMessage('Login berhasil!');
                navigate('/'); // Ganti dengan route yang sesuai
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                if (error.response.status === 401) {
                    setMessage('Username atau password salah.');
                } else {
                    setMessage('Terjadi kesalahan, silakan coba lagi.');
                }
            } else {
                setMessage('Terjadi kesalahan, silakan coba lagi.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="login-button">Login</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p className="register-text">
                Don't have an account? <span className="register-link" onClick={() => navigate('/register')}>Register here.</span>
            </p>
        </div>
    );
};

export default Login;
