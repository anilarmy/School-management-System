import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [role, setRole] = useState('admin');
    const [email, setEmail] = useState(''); // using email for student/teacher
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Quick admin bypass as requested to match "fixed logins" behavior if API is down or just for simplicity
        // But implementation plan says use API. So we try API first.

        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });

            const data = await res.json();

            if (res.ok) {
                // Store user info if needed
                localStorage.setItem('user', JSON.stringify(data));
                navigate(`/${data.role}/dashboard`);
            } else {
                alert(data.message || "Login Failed");
            }
        } catch (err) {
            console.error("Login error", err);
            // Fallback for Admin if backend not running (Development convenience, optional)
            if (role === 'admin' && email === 'admin' && password === 'admin') {
                navigate('/admin/dashboard');
                return;
            }
            alert("Error connecting to server");
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-dark">
            <div className="card w-full max-w-md glass">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-muted mb-2">Login As</label>
                        <select
                            className="input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-muted mb-2">{role === 'admin' ? 'Username' : 'Email'}</label>
                        <input
                            type="text"
                            className="input"
                            placeholder={role === 'admin' ? 'admin' : 'user@example.com'}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-muted mb-2">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn w-full mb-4">Login</button>

                    {role !== 'admin' && (
                        <p className="text-center text-muted text-sm">
                            Don't have an account? <Link to="/register" className="text-primary hover:underline">Register here</Link>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
