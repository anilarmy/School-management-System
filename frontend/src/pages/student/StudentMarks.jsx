import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';

const StudentMarks = () => {
    const [marks, setMarks] = useState([]);
    const studentId = 1; // Mock ID

    useEffect(() => {
        fetch(`http://localhost:8080/api/marks/student/${studentId}`)
            .then(res => res.json())
            .then(data => setMarks(data))
            .catch(err => console.error(err));
    }, []);

    const columns = [
        { key: 'examType', label: 'Exam' },
        { key: 'subjectName', label: 'Subject' },
        { key: 'marksObtained', label: 'Score' },
        { key: 'maxMarks', label: 'Max' },
    ];

    const displayMarks = marks.map(m => ({
        ...m,
        subjectName: m.subject?.name
    }));

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Marks</h1>
            <div className="card">
                <Table columns={columns} data={displayMarks} />
            </div>
        </div>
    );
};

export default StudentMarks;
