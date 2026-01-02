import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        grade: '', // student specific
        qualification: '' // teacher specific
    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const endpoint = role === 'student' ? '/register/student' : '/register/teacher';
            const res = await fetch(`http://localhost:8080/api/auth${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert("Registration Successful! Please wait for Admin approval before logging in.");
                navigate('/login');
            } else {
                alert("Registration Failed");
            }
        } catch (err) {
            console.error("Registration error", err);
            alert("Error connecting to server");
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-dark">
            <div className="card w-full max-w-md glass">
                <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-muted mb-2">Register As</label>
                        <select
                            className="input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <input type="text" className="input" placeholder="First Name" required
                            value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                        <input type="text" className="input" placeholder="Last Name" required
                            value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                    </div>

                    <div className="mb-4">
                        <input type="email" className="input" placeholder="Email" required
                            value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>

                    <div className="mb-4">
                        <input type="password" className="input" placeholder="Password" required
                            value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    </div>

                    {role === 'student' && (
                        <div className="mb-6">
                            <input type="text" className="input" placeholder="Grade (e.g. 10)" required
                                value={formData.grade} onChange={e => setFormData({ ...formData, grade: e.target.value })} />
                        </div>
                    )}

                    {role === 'teacher' && (
                        <div className="mb-6">
                            <input type="text" className="input" placeholder="Qualification" required
                                value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} />
                        </div>
                    )}

                    <button type="submit" className="btn w-full mb-4">Register</button>

                    <p className="text-center text-muted text-sm">
                        Already have an account? <Link to="/login" className="text-primary hover:underline">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
