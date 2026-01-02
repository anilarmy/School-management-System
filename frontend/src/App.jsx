import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/common/Login';
import Register from './pages/common/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminFees from './pages/admin/AdminFees';
import AdminTimetable from './pages/admin/AdminTimetable';
import AdminApprovals from './pages/admin/AdminApprovals';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentFees from './pages/student/StudentFees';
import StudentMarks from './pages/student/StudentMarks';
import StudentAttendance from './pages/student/StudentAttendance';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherMarks from './pages/teacher/TeacherMarks';
import Sidebar from './components/Sidebar';

// Layout wrapper to include Sidebar
const DashboardLayout = ({ children, role }) => {
  return (
    <div className="flex bg-dark">
      <Sidebar role={role} />
      <div className="main-content w-full">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <DashboardLayout role="admin">
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="teachers" element={<AdminTeachers />} />
              <Route path="fees" element={<AdminFees />} />
              <Route path="timetable" element={<AdminTimetable />} />
              <Route path="approvals" element={<AdminApprovals />} />
            </Routes>
          </DashboardLayout>
        } />

        {/* Teacher Routes */}
        <Route path="/teacher/*" element={
          <DashboardLayout role="teacher">
            <Routes>
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="attendance" element={<TeacherAttendance />} />
              <Route path="marks" element={<TeacherMarks />} />
            </Routes>
          </DashboardLayout>
        } />

        {/* Student Routes */}
        <Route path="/student/*" element={
          <DashboardLayout role="student">
            <Routes>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="fees" element={<StudentFees />} />
              <Route path="marks" element={<StudentMarks />} />
              <Route path="attendance" element={<StudentAttendance />} />
            </Routes>
          </DashboardLayout>
        } />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
