import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import NotFound from '../pages/NotFound';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();

  const { currentUser, isLoading, isAuthenticated } = useCurrentUser();
  const role = currentUser?.role;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // if user loaded and not authenticated redirect to login page
      navigate('/login');
    } else if (
      !isLoading &&
      isAuthenticated &&
      allowedRoles &&
      !allowedRoles.includes(role)
    ) {
      // if user loaded and authenticated but role is not allowed for this page, redirect to their dashboard
      navigate(`/${role}`);
    }
  }, [isAuthenticated, isLoading, role, allowedRoles, navigate]);

  if (isLoading)
    return (
      <div className="bg-L2 flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated && (!allowedRoles || allowedRoles.includes(role))) {
    return children;
  }

  return <NotFound />;
};

export default ProtectedRoute;
