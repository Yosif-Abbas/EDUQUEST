import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import Layout from './components/Layout';

import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

import StudentLayout from './components/StudentLayout';

import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import Wishlist from './pages/student/Wishlist';
import StudentSettings from './pages/student/StudentSettings';
import WatchCourse from './pages/student/WatchCourse';

import TeacherLayout from './components/TeacherLayout';

import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherCourses from './pages/teacher/TeacherCourses';
import NewCourse from './pages/teacher/NewCourse';
import TeacherSettings from './pages/teacher/TeacherSettings';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<StudentDashboard />}></Route>
        <Route path="courses" element={<StudentCourses />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="settings" element={<StudentSettings />} />
        <Route path="courses/:id/watch" element={<WatchCourse />} />
      </Route>

      {/* Teacher Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<TeacherCourses />} />
        <Route path="NewCourse" element={<NewCourse />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
