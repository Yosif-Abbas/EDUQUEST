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
import StudentTeachers from './pages/student/StudentTeachers';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student Routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route
          index
          element={
            <ProtectedRoute role="student">
              <Navigate replace to="dashboard" />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="courses"
          element={
            <ProtectedRoute role="student">
              <StudentCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="wishlist"
          element={
            <ProtectedRoute role="student">
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="teachers"
          element={
            <ProtectedRoute role="student">
              <StudentTeachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute role="student">
              <StudentSettings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* watch course accessible for student and teacher */}
      <Route
        path="/courses/:id/watch"
        element={
          <ProtectedRoute role={['student', 'teacher']}>
            <WatchCourse />
          </ProtectedRoute>
        }
      />

      {/* Teacher Routes */}

      <Route path="/teacher" element={<TeacherLayout />}>
        <Route
          index
          element={
            <ProtectedRoute role="teacher">
              <Navigate replace to="dashboard" />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="courses"
          element={
            <ProtectedRoute role="teacher">
              <TeacherCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="NewCourse"
          element={
            <ProtectedRoute role="teacher">
              <NewCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute role="teacher">
              <TeacherSettings />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
