import { createContext, FC, useContext, useState } from 'react';
import { defaultContextAuth, MyAuthContextProviderProps } from '../interface/AuthInterface';

export const AuthContext = createContext(defaultContextAuth);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<MyAuthContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const clearUsername = () => setUsername('');
  const getUsername = (u:string) => setUsername(u);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, getUsername, clearUsername }}>
      {children}
    </AuthContext.Provider>
  );
};