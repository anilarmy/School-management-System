import React, { useState, useEffect } from 'react';

const TeacherMarks = () => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [formData, setFormData] = useState({
        studentId: '',
        subjectId: '',
        marksObtained: '',
        maxMarks: '100',
        examType: 'Final'
    });

    useEffect(() => {
        // parallel fetch
        fetch('http://localhost:8080/api/students').then(res => res.json()).then(setStudents);
        fetch('http://localhost:8080/api/subjects').then(res => res.json()).then(setSubjects);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                student: { id: formData.studentId },
                subject: { id: formData.subjectId },
                marksObtained: formData.marksObtained,
                maxMarks: formData.maxMarks,
                examType: formData.examType
            };

            const res = await fetch('http://localhost:8080/api/marks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert("Marks uploaded successfully!");
                setFormData({ ...formData, marksObtained: '' });
            }
        } catch (err) {
            console.error("Failed to upload marks", err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Upload Marks</h1>
            <div className="card max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-2 text-muted">Student</label>
                            <select
                                className="input" required
                                value={formData.studentId}
                                onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                            >
                                <option value="">Select Student</option>
                                {students.map(s => (
                                    <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-muted">Subject</label>
                            <select
                                className="input" required
                                value={formData.subjectId}
                                onChange={e => setFormData({ ...formData, subjectId: e.target.value })}
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-2 text-muted">Marks Obtained</label>
                            <input
                                type="number" className="input" required
                                value={formData.marksObtained}
                                onChange={e => setFormData({ ...formData, marksObtained: e.target.value })}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-2 text-muted">Max Marks</label>
                            <input
                                type="number" className="input" required
                                value={formData.maxMarks}
                                onChange={e => setFormData({ ...formData, maxMarks: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2 text-muted">Exam Type</label>
                        <input
                            type="text" className="input" required
                            value={formData.examType}
                            onChange={e => setFormData({ ...formData, examType: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn">Upload Marks</button>
                </form>
            </div>
        </div>
    );
};

export default TeacherMarks;
