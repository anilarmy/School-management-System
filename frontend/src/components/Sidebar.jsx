import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ role }) => {
    const location = useLocation();

    const links = {
        admin: [
            { path: '/admin/dashboard', label: 'Dashboard' },
            { path: '/admin/students', label: 'Students' },
            { path: '/admin/teachers', label: 'Teachers' },
            { path: '/admin/fees', label: 'Fees' },
            { path: '/admin/timetable', label: 'Timetable' },
            { path: '/admin/approvals', label: 'Approvals' },
        ],
        teacher: [
            { path: '/teacher/dashboard', label: 'Dashboard' },
            { path: '/teacher/attendance', label: 'Attendance' },
            { path: '/teacher/marks', label: 'Marks' },
        ],
        student: [
            { path: '/student/dashboard', label: 'Dashboard' },
            { path: '/student/fees', label: 'My Fees' },
            { path: '/student/marks', label: 'My Marks' },
            { path: '/student/attendance', label: 'My Attendance' },
        ]
    };

    const roleLinks = links[role] || [];

    return (
        <div className="sidebar p-4 pb-0">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-white">
                    S
                </div>
                <h2 className="text-xl font-bold m-0" style={{ color: 'var(--text-main)' }}>SchoolApp</h2>
            </div>

            <nav>
                {roleLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`nav-item ${location.pathname.includes(link.path) ? 'active' : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
                <div className="nav-item cursor-pointer" style={{ color: 'var(--secondary)' }}>
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
