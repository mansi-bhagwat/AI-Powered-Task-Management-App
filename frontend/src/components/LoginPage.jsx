import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for redirecting

    const handleLogin = async (e) => {
        e.preventDefault();
        if (password !== 'admin') {
            alert('Incorrect password');
            return;
        }
        // If password is correct, navigate to the Home page
        navigate('/home'); // Redirect to Home after successful login
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        }}>
            <div style={{
                padding: '50px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                background: 'white',
                width: '400px'
            }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    color: '#333', 
                    fontSize: '24px',
                    marginBottom: '20px'
                }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginBottom: '20px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <button type="submit" style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '18px',
                        background: '#6200ee',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        Submit
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    New User? <a href="/signup" style={{ color: '#6200ee' }}>Sign up here</a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;

