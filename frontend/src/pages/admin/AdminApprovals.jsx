import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';

const AdminApprovals = () => {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = () => {
        fetch('http://localhost:8080/api/auth/pending/students')
            .then(res => res.json())
            .then(setStudents);

        fetch('http://localhost:8080/api/auth/pending/teachers')
            .then(res => res.json())
            .then(setTeachers);
    };

    const approveUser = async (id, role) => {
        try {
            const endpoint = role === 'student' ? 'student' : 'teacher';
            const res = await fetch(`http://localhost:8080/api/auth/approve/${endpoint}/${id}`, {
                method: 'PUT'
            });
            if (res.ok) {
                alert("User Approved!");
                fetchPending();
            }
        } catch (err) {
            console.error("Failed to approve", err);
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email' },
    ];

    const actions = (role) => (row) => (
        <button onClick={() => approveUser(row.id, role)} className="btn bg-green-500 text-xs py-1 px-3">
            Approve
        </button>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Pending Approvals</h1>

            <div className="card mb-8">
                <h2 className="text-xl mb-4 font-semibold text-secondary">Pending Teachers</h2>
                <Table columns={columns} data={teachers} actions={actions('teacher')} />
            </div>

            <div className="card">
                <h2 className="text-xl mb-4 font-semibold text-primary">Pending Students</h2>
                <Table columns={columns} data={students} actions={actions('student')} />
            </div>
        </div>
    );
};

export default AdminApprovals;
