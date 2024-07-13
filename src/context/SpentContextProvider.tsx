import { createContext, useState, ReactNode, FC } from 'react';

interface Spent {
    key: string;
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
            key: '1',
            spent_name: 'Oxxo',
        },
        {
            key: '2',
            spent_name: 'Mercado',
        },
        {
            key: '3',
            spent_name: 'Bencina',
        },
    ]
  const [spentContext, setSpentContext] = useState<Spent[]>(dataDemo);  

  return (
    <SpentContext.Provider value={{ spentContext, setSpentContext }}>
      {children}
    </SpentContext.Provider>
  );
};
