'use client';
import { useEffect, useState, useContext, createContext } from 'react';
import { quizzesData } from './QuizzesData';
const GlobalContext = createContext();

export function ContextProvider({ children }) {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selectQuizToStart, setSelectQuizToStart] = useState(null);

  useEffect(() => {
    setAllQuizzes(quizzesData);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        allQuizzes,
        setAllQuizzes,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContextProvider() {
  return useContext(GlobalContext);
}
