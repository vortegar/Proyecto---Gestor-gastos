import { ReactNode } from 'react';

export interface AuthContextProps {
  isAuthenticated: boolean;
  username?: string,
  uploadedData: boolean,
  login: () => void;
  logout: () => void;
  getUsername: (username:string) => void,
  clearUsername: () => void,
  uploaded: () => void,
  cleanData: () => void,
}

export const defaultContextAuth: AuthContextProps = {
  isAuthenticated: false,
  username: undefined,
  uploadedData: false,
  login: () => {},
  logout: () => {},
  getUsername: () => {},
  clearUsername: () => {},
  uploaded: () => {},
  cleanData: () => {},
};

export interface MyAuthContextProviderProps {
  children: ReactNode;
}
