import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import NotFound from '../pages/NotFound';
import Loading from './Loading';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();

  const { currentUser, isLoading, isAuthenticated } = useCurrentUser();
  const role = currentUser?.role;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/login');
    } else if (allowedRoles && !allowedRoles.includes(role)) {
      navigate(`/${role}`);
    }
  }, [isAuthenticated, isLoading, role, allowedRoles, navigate]);

  if (isLoading)
    return (
      <div className="bg-L2 flex h-screen items-center justify-center">
        <Loading size={150} />
      </div>
    );

  if (isAuthenticated && (!allowedRoles || allowedRoles.includes(role))) {
    return children;
  }

  return <NotFound />;
};

export default ProtectedRoute;
