import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import NotFound from '../pages/NotFound';
import Loading from './Loading';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();

  const { currentUser, isLoading, isAuthenticated } = useCurrentUser();
  const role = currentUser?.role;

  const [timeoutReached, setTimeoutReached] = useState(false);

  console.log(timeoutReached);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  useEffect(() => {
    if (isLoading || currentUser === null) return;

    if (!isAuthenticated) {
      navigate('/login');
    } else if (allowedRoles && !allowedRoles.includes(role)) {
      navigate(`/${role}`);
    }
  }, [isAuthenticated, isLoading, role, allowedRoles, navigate, currentUser]);

  if ((!timeoutReached || isLoading) && currentUser === null) {
    return (
      <div className="bg-L2 flex h-screen items-center justify-center">
        <Loading size={150} />
      </div>
    );
  }

  if (!currentUser) return <NotFound />;

  if (isAuthenticated && (!allowedRoles || allowedRoles.includes(role))) {
    return children;
  }

  return <NotFound />;
};

export default ProtectedRoute;
