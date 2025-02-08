import { createContext, FC, useContext, useState } from 'react';
import { defaultContextAuth, MyAuthContextProviderProps } from '../interface/AuthInterface';

export const AuthContext = createContext(defaultContextAuth);
interface AuthContextType {
  isAuthenticated : boolean;
  login     : () => void;
  logout    : () => void;
  username ?: string;
  userUid  ?: string;
  getUsername   : (u: string) => void;
  clearUsername : () => void;
  uploaded    : () => void;
  uploadedData: boolean;
  cleanData   : () => void;
  getUserUid  : (u: string) => void;
  clearUserUid: () => void;
}

export const useAuth = () => useContext<AuthContextType>(AuthContext);

export const AuthProvider: FC<MyAuthContextProviderProps> = ({ children }) => {
  const [userUid, setUserUid] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  const [uploadedData, setUploadedData] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const uploaded = () => setUploadedData(true);
  const cleanData = () => setUploadedData(false);

  const clearUserUid = () => setUserUid(undefined);
  const getUserUid = (u:string) => setUserUid(u);

  const clearUsername = () => setUsername(undefined);
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