import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContextProvider';

interface ProtectedRouteProps {
  element: React.ElementType;  
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
