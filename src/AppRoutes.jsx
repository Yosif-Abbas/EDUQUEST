import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import Layout from './components/layout/Layout';

import CourseDetails from './pages/CourseDetails';
import Courses from './pages/Courses';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';

import StudentLayout from './components/student/StudentLayout';

import StudentCourses from './pages/student/StudentCourses';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentSettings from './pages/student/StudentSettings';
import WatchCourse from './pages/student/WatchCourse';
import Wishlist from './pages/student/Wishlist';

import TeacherLayout from './components/teacher/TeacherLayout';

import About from './pages/About';
import Contact from './pages/Contact';
import QuestionBank from './pages/QuestionBank';
import NewCourse from './pages/teacher/NewCourse';
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherSettings from './pages/teacher/TeacherSettings';
import Onboarding from './pages/Onboarding';
import PublicRoute from './components/PublicRoute';
import { useCurrentUser } from './hooks/users/useCurrentUser';
import PageLoading from './components/PageLoading';
import supabase from '../supabase';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function AppRoutes() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading } = useCurrentUser();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        queryClient.invalidateQueries({ queryKey: ['user'] });

        const { data: profile, error } = await supabase
          .from('users')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        console.log('session: ', session);
        console.log('profile: ', profile);
        console.log('error: ', error);

        if (!profile?.role) navigate('/onboarding');
        else if (profile?.role === 'student') navigate('/student');
        else if (profile?.role === 'teacher') navigate('/teacher');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate, queryClient]);

  if (isLoading) return <PageLoading />;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/question-bank"
          element={
            <ProtectedRoute allowedRoles={['student', 'teacher']}>
              <QuestionBank />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

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
      </Route>

      <Route
        path="courses/:id/watch"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <WatchCourse />
          </ProtectedRoute>
        }
      />

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
