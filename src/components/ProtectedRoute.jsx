import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import NotFound from '../pages/NotFound';
import Loading from './Loading';
import Onboarding from '../pages/Onboarding';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();

  const { currentUser, isLoading, isAuthenticated } = useCurrentUser();
  const role = currentUser?.role;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (allowedRoles && !allowedRoles.includes(role)) {
      navigate(`/${role}`, { replace: true });
    }
  }, [isAuthenticated, isLoading, role, allowedRoles, navigate]);

  if (isLoading) {
    return (
      <div className="bg-L2 flex h-screen items-center justify-center">
        <Loading size={150} />
      </div>
    );
  }

  if (!isAuthenticated) return <NotFound />;
  if (!role) return <Onboarding />;

  return children;
};

export default ProtectedRoute;

// console.log(currentUser, isLoading, isAuthenticated);
