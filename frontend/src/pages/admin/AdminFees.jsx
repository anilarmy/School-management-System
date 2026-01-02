import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';

const AdminFees = () => {
    const [fees, setFees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        studentId: '',
        title: '',
        amount: '',
        dueDate: ''
    });

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/fees');
            const data = await res.json();
            setFees(data);
        } catch (err) {
            console.error("Failed to fetch fees", err);
        }
    };

    const handlePay = async (feeId) => {
        try {
            const res = await fetch(`http://localhost:8080/api/fees/${feeId}/pay`, {
                method: 'PUT'
            });
            if (res.ok) {
                fetchFees();
            }
        } catch (err) {
            console.error("Failed to update fee status", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Need to structure body to match Entity expectation. 
            // Backend expects { student: { id: ... }, ... }
            const payload = {
                student: { id: formData.studentId },
                title: formData.title,
                amount: formData.amount,
                dueDate: formData.dueDate,
                isPaid: false
            };

            const res = await fetch('http://localhost:8080/api/fees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setShowForm(false);
                fetchFees();
                setFormData({ studentId: '', title: '', amount: '', dueDate: '' });
            }
        } catch (err) {
            console.error("Failed to create fee", err);
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
        { key: 'amount', label: 'Amount' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'isPaid', label: 'Status' } // This will render boolean as string/empty, need custom render in updated Table or map data
    ];

    // Custom row mapper for display
    const displayFees = fees.map(f => ({
        ...f,
        isPaid: f.isPaid ? 'PAID' : 'PENDING'
    }));

    const actions = (row) => (
        row.isPaid === 'PENDING' ? (
            <button onClick={() => handlePay(row.id)} className="btn bg-green-500 text-xs py-1 px-2">
                Mark Paid
            </button>
        ) : <span className="text-green-400 font-bold">✓</span>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Fee Management</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn">
                    {showForm ? 'Cancel' : 'Add Fee'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-8">
                    <h2 className="text-xl mb-4">Add New Fee</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <input
                                type="number" className="input" placeholder="Student ID" required
                                value={formData.studentId}
                                onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                            />
                            <input
                                type="text" className="input" placeholder="Fee Title" required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-4">
                            <input
                                type="number" className="input" placeholder="Amount" required
                                value={formData.amount}
                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                            />
                            <input
                                type="date" className="input" required
                                value={formData.dueDate}
                                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn self-end">Create Fee</button>
                    </form>
                </div>
            )}

            <div className="card">
                <Table columns={columns} data={displayFees} actions={actions} />
            </div>
        </div>
    );
};

export default AdminFees;
