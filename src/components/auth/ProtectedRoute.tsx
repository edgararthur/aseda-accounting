import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}