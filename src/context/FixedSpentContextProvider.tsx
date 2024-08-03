import { createContext, useState, ReactNode, FC } from 'react';

interface FixedSpent {
  id: string;
  fixed_spent_name: string;
}

interface FixedSpentContextProps {
  fixedSpentContext: FixedSpent[];
  setFixedSpentContext: React.Dispatch<React.SetStateAction<FixedSpent[]>>;
}

interface FixedSpentContextProviderProps {
  children: ReactNode;
}

const defaultContext: FixedSpentContextProps = {
  fixedSpentContext: [],
  setFixedSpentContext: () => {}
};

export const FixedSpentContext = createContext<FixedSpentContextProps>(defaultContext);

export const FixedSpentContextProvider: FC<FixedSpentContextProviderProps> = ({ children }) => {
  const dataDemo: FixedSpent[] = [
    {
      id: '1',
      fixed_spent_name: '',
    }
  ];
  
  const [fixedSpentContext, setFixedSpentContext] = useState<FixedSpent[]>(dataDemo);

  return (
    <FixedSpentContext.Provider value={{ fixedSpentContext, setFixedSpentContext }}>
      {children}
    </FixedSpentContext.Provider>
  );
};
