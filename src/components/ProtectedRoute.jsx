import { useNavigate } from 'react-router-dom';
// import StudentLayout from './StudentLayout';
// import TeacherLayout from './TeacherLayout';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

const ProtectedRoute = ({ children }) => {
  console.log('ProtectedRoute called');

  const navigate = useNavigate();

  console.log('Calling useCurrentUser hook in ProtectedRoute');
  const { isLoading, isAuthenticated } = useCurrentUser();

  useEffect(
    function () {
      console.log('useEffect called in ProtectedRoute');

      if (!isLoading && !isAuthenticated) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate],
  );

  console.log('ProtectedRoute isLoading:', isLoading);

  if (isLoading) return <Spinner />;

  console.log('Current user authenticated');

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
