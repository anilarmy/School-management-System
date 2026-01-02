import React, { useState, useEffect } from 'react';

const StudentAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const studentId = 1; // Mock ID

    useEffect(() => {
        fetch(`http://localhost:8080/api/attendance/student/${studentId}`)
            .then(res => res.json())
            .then(data => setAttendance(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Attendance</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {attendance.map((record, idx) => (
                    <div key={idx} className={`p-4 rounded border ${record.isPresent ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                        <div className="font-bold">{record.date}</div>
                        <div className={record.isPresent ? 'text-green-400' : 'text-red-400'}>
                            {record.isPresent ? 'Present' : 'Absent'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentAttendance;
