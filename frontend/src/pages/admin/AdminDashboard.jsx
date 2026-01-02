import React from 'react';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Students', value: '1,200', color: 'bg-primary' },
        { label: 'Total Teachers', value: '45', color: 'bg-secondary' },
        { label: 'Pending Fees', value: '$12,500', color: 'bg-yellow-500' }, // Inline style for yellow if not var
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="flex gap-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="card flex-1">
                        <h3 className="text-muted text-sm uppercase tracking-wider mb-2">{stat.label}</h3>
                        <p className="text-4xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="card">
                <h2 className="text-xl font-bold mb-4">Recent Notices</h2>
                <p className="text-muted">No new notices.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
