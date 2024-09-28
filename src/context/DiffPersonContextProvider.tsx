import { createContext, useState, ReactNode, FC } from 'react';

export  interface DiffPerson {
  user  ?: string;
  total ?: number | string;
}
  
  interface MyContextProviderProps {
    children: ReactNode;
  }

  interface MyContextProps {
    diffContext: DiffPerson;
    setDiffContext: React.Dispatch<React.SetStateAction<DiffPerson>>;
  }
  
  const defaultContext: MyContextProps = {
    diffContext: {},
    setDiffContext: () => {},
  };

export const DiffContext = createContext<MyContextProps>(defaultContext);

export const DiffContextProvider: FC<MyContextProviderProps> = ({ children }) => {

  const [ diffContext, setDiffContext] = useState<DiffPerson>({});  
  
  return (
    <DiffContext.Provider value={{ diffContext, setDiffContext }}>
      {children}
    </DiffContext.Provider>
  );
};
