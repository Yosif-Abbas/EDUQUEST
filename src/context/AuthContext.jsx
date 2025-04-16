import { createContext, useContext } from 'react';
import { useUser } from '../hooks/useUser';
import { useCurrentUser } from '../hooks/useCurrentUser';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const currentUser = useCurrentUser();

  const { user, isLoading } = useUser(currentUser?.id);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
