// PublicRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../hooks/users/useCurrentUser';

export default function PublicRoute() {
  const { isAuthenticated } = useCurrentUser();

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
