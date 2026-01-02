import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';

const AdminStudents = () => {
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        grade: '' // Or classId
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/students');
            const data = await res.json();
            setStudents(data);
        } catch (err) {
            console.error("Failed to fetch students", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setShowForm(false);
                fetchStudents();
                setFormData({ firstName: '', lastName: '', email: '', grade: '' });
            }
        } catch (err) {
            console.error("Failed to create student", err);
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'grade', label: 'Grade' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Students</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn">
                    {showForm ? 'Cancel' : 'Add Student'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-8 animate-fade-in">
                    <h2 className="text-xl mb-4">Add New Student</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <input
                                type="text" className="input" placeholder="First Name" required
                                value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                            />
                            <input
                                type="text" className="input" placeholder="Last Name" required
                                value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-4">
                            <input
                                type="email" className="input" placeholder="Email" required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                            <input
                                type="text" className="input" placeholder="Grade (e.g. 10)" required
                                value={formData.grade}
                                onChange={e => setFormData({ ...formData, grade: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn self-end">Save Student</button>
                    </form>
                </div>
            )}

            <div className="card">
                <Table columns={columns} data={students} />
            </div>
        </div>
    );
};

export default AdminStudents;
