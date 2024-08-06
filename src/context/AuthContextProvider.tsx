import { createContext, FC, useContext, useState } from 'react';
import { defaultContextAuth, MyAuthContextProviderProps } from '../interface/AuthInterface';

export const AuthContext = createContext(defaultContextAuth);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<MyAuthContextProviderProps> = ({ children }) => {
  const [userUid, setUserUid] = useState();
  const [username, setUsername] = useState();

  const [uploadedData, setUploadedData] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const uploaded = () => setUploadedData(true);
  const cleanData = () => setUploadedData(false);

  const clearUserUid = () => setUserUid('');
  const getUserUid = (u:string) => setUserUid(u);

  const clearUsername = () => setUsername('');
  const getUsername = (u:string) => setUsername(u);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      username, 
      userUid,
      getUsername, 
      clearUsername, 
      uploaded, 
      uploadedData, 
      cleanData, 
      getUserUid, 
      clearUserUid }}
    >
      {children}
    </AuthContext.Provider>
  );
};