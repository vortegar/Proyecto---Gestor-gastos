import { ReactNode } from 'react';

export interface AuthContextProps {
  isAuthenticated: boolean;
  username?: string,
  login: () => void;
  logout: () => void;
  getUsername: (username:string) => void,
  clearUsername: () => void,

}

export const defaultContextAuth: AuthContextProps = {
  isAuthenticated: false,
  username: undefined,
  login: () => {},
  logout: () => {},
  getUsername: () => {},
  clearUsername: () => {},

};

export interface MyAuthContextProviderProps {
  children: ReactNode;
}
