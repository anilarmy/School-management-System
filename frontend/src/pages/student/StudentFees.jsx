import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';

const StudentFees = () => {
    const [fees, setFees] = useState([]);
    const studentId = 1; // Mock ID

    useEffect(() => {
        fetch(`http://localhost:8080/api/fees/student/${studentId}`)
            .then(res => res.json())
            .then(data => setFees(data))
            .catch(err => console.error(err));
    }, []);

    const columns = [
        { key: 'title', label: 'Title' },
        { key: 'amount', label: 'Amount' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'status', label: 'Status' }
    ];

    const displayFees = fees.map(f => ({
        ...f,
        status: f.isPaid ? 'PAID' : 'PENDING'
    }));

    const actions = (row) => (
        row.isPaid ? (
            <button className="btn bg-gray-600 text-xs py-1 px-2 pointer-events-none">
                Receipt
            </button>
        ) : <span className="text-yellow-500 text-xs">Due</span>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Fees</h1>
            <div className="card">
                <Table columns={columns} data={displayFees} actions={actions} />
            </div>
        </div>
    );
};

export default StudentFees;
