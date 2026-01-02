import React from 'react';

const TeacherDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>
            <div className="flex gap-4">
                <div className="card flex-1">
                    <h3 className="text-muted text-sm uppercase mb-2">My Classes</h3>
                    <p className="text-4xl font-bold">4</p>
                </div>
                <div className="card flex-1">
                    <h3 className="text-muted text-sm uppercase mb-2">Total Students</h3>
                    <p className="text-4xl font-bold">128</p>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
