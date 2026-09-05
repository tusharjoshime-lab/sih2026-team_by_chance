import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/api';

const AuthGuard = ({ children }) => {
  const token = getAuthToken();
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default AuthGuard;
