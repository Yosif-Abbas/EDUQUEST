import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StudentLayout from './StudentLayout';
import TeacherLayout from './TeacherLayout';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  console.log(user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user?.role === 'student') return <StudentLayout />;

  if (user?.role === 'teacher') return <TeacherLayout />;

  return children;
};

export default ProtectedRoute;
