import { createContext, useState, ReactNode, FC } from 'react';

interface Spent {
    id: string;
    spent_name: string;
  }

  interface MyContextProviderProps {
    children: ReactNode;
  }

  interface MyContextProps {
    spentContext: Spent[];
    setSpentContext: React.Dispatch<React.SetStateAction<Spent[]>>;
  }

  const defaultContext: MyContextProps = {
    spentContext: [],
    setSpentContext: () => [],
  };


export const SpentContext = createContext<MyContextProps>(defaultContext);

export const SpentContextProvider: FC<MyContextProviderProps> = ({ children }) => {

    const dataDemo:Spent[] = [
        {
            id: '1',
            spent_name: '',
        }
    ]
  const [spentContext, setSpentContext] = useState<Spent[]>(dataDemo);  

  return (
    <SpentContext.Provider value={{ spentContext, setSpentContext }}>
      {children}
    </SpentContext.Provider>
  );
};
