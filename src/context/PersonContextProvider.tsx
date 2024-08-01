import { createContext, useState, ReactNode, FC } from 'react';

interface Person {
    id: string;
    person_name: string;
  }

  interface MyContextProviderProps {
    children: ReactNode;
  }

  interface MyContextProps {
    personContext: Person[];
    setPersonContext: React.Dispatch<React.SetStateAction<Person[]>>;
  }
  
  const defaultContext: MyContextProps = {
    personContext: [],
    setPersonContext: () => [],
  };

export const PersonContext = createContext<MyContextProps>(defaultContext);

export const PersonContextProvider: FC<MyContextProviderProps> = ({ children }) => {

    const dataDemo:Person[] = [
        {
            id: '1',
            person_name: '',
        },
    ]

  const [personContext, setPersonContext] = useState<Person[]>(dataDemo);  
  return (
    <PersonContext.Provider value={{ personContext, setPersonContext }}>
      {children}
    </PersonContext.Provider>
  );
};
