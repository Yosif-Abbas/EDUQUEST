import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useCurrentUser();

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading)
    return (
      <div className="bg-L2 flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
