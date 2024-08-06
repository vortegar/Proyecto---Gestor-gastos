import { ReactNode } from 'react';

export interface AuthContextProps {
  isAuthenticated: boolean;
  username?: string,
  userUid?: string,
  uploadedData: boolean,
  login: () => void;
  logout: () => void;
  getUsername: (username:string) => void,
  clearUsername: () => void,
  getUserUid: (username:string) => void,
  clearUserUid: () => void,
  uploaded: () => void,
  cleanData: () => void,
}

export const defaultContextAuth: AuthContextProps = {
  isAuthenticated: false,
  username: undefined,
  userUid: undefined,
  uploadedData: false,
  login: () => {},
  logout: () => {},
  getUsername: () => {},
  clearUsername: () => {},
  getUserUid: () => {},
  clearUserUid: () => {},
  uploaded: () => {},
  cleanData: () => {},
};

export interface MyAuthContextProviderProps {
  children: ReactNode;
}
