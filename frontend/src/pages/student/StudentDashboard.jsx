import React from 'react';

const StudentDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
            <div className="flex gap-4 mb-8">
                <div className="card flex-1 bg-gradient-to-r from-blue-500 to-blue-600 border-none">
                    <h3 className="text-white text-sm uppercase mb-2 opacity-80">Attendance</h3>
                    <p className="text-4xl font-bold text-white">85%</p>
                </div>
                <div className="card flex-1 bg-gradient-to-r from-purple-500 to-purple-600 border-none">
                    <h3 className="text-white text-sm uppercase mb-2 opacity-80">Pending Fees</h3>
                    <p className="text-4xl font-bold text-white">$450</p>
                </div>
            </div>

            <div className="card">
                <h2 className="text-xl font-bold mb-4">My Timetable (Monday)</h2>
                <div className="p-4 bg-white/5 rounded">
                    <div className="flex justify-between border-b border-white/10 py-2">
                        <span>09:00 AM</span>
                        <span className="font-bold">Mathematics</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-2">
                        <span>10:00 AM</span>
                        <span className="font-bold">Science</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
