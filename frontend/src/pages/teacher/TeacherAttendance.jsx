import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';

const TeacherAttendance = () => {
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Mock fetching students for a class (e.g. Class 1)
    // In real app, Teacher would select a class first
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/students'); // Fetch all for demo
            const data = await res.json();
            setStudents(data);
        } catch (err) {
            console.error("Failed to fetch students", err);
        }
    };

    const markAttendance = async (studentId, isPresent) => {
        try {
            await fetch('http://localhost:8080/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student: { id: studentId },
                    date: date,
                    isPresent: isPresent
                })
            });
            alert(`Marked student ${studentId} as ${isPresent ? 'Present' : 'Absent'}`);
        } catch (err) {
            console.error("Failed to mark attendance", err);
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
    ];

    const actions = (row) => (
        <div className="flex gap-2">
            <button onClick={() => markAttendance(row.id, true)} className="btn bg-green-500 py-1 px-3">P</button>
            <button onClick={() => markAttendance(row.id, false)} className="btn bg-red-500 py-1 px-3">A</button>
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>
            <div className="card mb-6">
                <label className="text-muted mr-4">Date:</label>
                <input
                    type="date" className="input inline-block w-auto mb-0"
                    value={date} onChange={e => setDate(e.target.value)}
                />
            </div>
            <div className="card">
                <Table columns={columns} data={students} actions={actions} />
            </div>
        </div>
    );
};

export default TeacherAttendance;
