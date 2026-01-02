import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';

const AdminTimetable = () => {
    const [timetables, setTimetables] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        classId: '',
        subjectId: '',
        teacherId: '',
        dayOfWeek: 'MONDAY',
        startTime: '',
        endTime: ''
    });

    useEffect(() => {
        fetchTimetables();
    }, []);

    const fetchTimetables = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/timetables');
            const data = await res.json();
            setTimetables(data);
        } catch (err) {
            console.error("Failed to fetch timetables", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                classRoom: { id: formData.classId },
                subject: { id: formData.subjectId },
                teacher: { id: formData.teacherId },
                dayOfWeek: formData.dayOfWeek,
                startTime: formData.startTime, // Assuming "HH:mm" format matches LocalTime
                endTime: formData.endTime
            };

            const res = await fetch('http://localhost:8080/api/timetables', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setShowForm(false);
                fetchTimetables();
                setFormData({ classId: '', subjectId: '', teacherId: '', dayOfWeek: 'MONDAY', startTime: '', endTime: '' });
            }
        } catch (err) {
            console.error("Failed to create timetable", err);
        }
    };

    const columns = [
        { key: 'dayOfWeek', label: 'Day' },
        { key: 'startTime', label: 'Start' },
        { key: 'endTime', label: 'End' },
        { key: 'subjectName', label: 'Subject' },
        { key: 'className', label: 'Class' },
    ];

    // Flatten nested objects for table
    const displayTimetables = timetables.map(t => ({
        ...t,
        subjectName: t.subject?.name,
        className: t.classRoom?.name
    }));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Timetable</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn">
                    {showForm ? 'Cancel' : 'Add Entry'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-8">
                    <h2 className="text-xl mb-4">Add Timetable Entry</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <select
                                className="input"
                                value={formData.dayOfWeek}
                                onChange={e => setFormData({ ...formData, dayOfWeek: e.target.value })}
                            >
                                {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                            <input
                                type="number" className="input" placeholder="Class ID" required
                                value={formData.classId}
                                onChange={e => setFormData({ ...formData, classId: e.target.value })}
                            />
                            <input
                                type="number" className="input" placeholder="Subject ID" required
                                value={formData.subjectId}
                                onChange={e => setFormData({ ...formData, subjectId: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-4">
                            <input
                                type="number" className="input" placeholder="Teacher ID" required
                                value={formData.teacherId}
                                onChange={e => setFormData({ ...formData, teacherId: e.target.value })}
                            />
                            <input
                                type="time" className="input" required
                                value={formData.startTime}
                                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                            />
                            <input
                                type="time" className="input" required
                                value={formData.endTime}
                                onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn self-end">Save Entry</button>
                    </form>
                </div>
            )}

            <div className="card">
                <Table columns={columns} data={displayTimetables} />
            </div>
        </div>
    );
};

export default AdminTimetable;
