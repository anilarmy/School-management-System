import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';

const AdminTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        qualification: ''
    });

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/teachers');
            const data = await res.json();
            setTeachers(data);
        } catch (err) {
            console.error("Failed to fetch teachers", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/teachers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setShowForm(false);
                fetchTeachers();
                setFormData({ firstName: '', lastName: '', email: '', qualification: '' });
            }
        } catch (err) {
            console.error("Failed to create teacher", err);
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'qualification', label: 'Qualification' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Teachers</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn">
                    {showForm ? 'Cancel' : 'Add Teacher'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-8">
                    <h2 className="text-xl mb-4">Add New Teacher</h2>
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
                                type="text" className="input" placeholder="Qualification" required
                                value={formData.qualification}
                                onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn self-end">Save Teacher</button>
                    </form>
                </div>
            )}

            <div className="card">
                <Table columns={columns} data={teachers} />
            </div>
        </div>
    );
};

export default AdminTeachers;
