'use client';
import { useEffect, useState, useContext, createContext } from 'react';
import { quizzesData } from './QuizzesData';
const GlobalContext = createContext();

export function ContextProvider({ children }) {
    const defaultUser = {
        id: 1,
        name: 'quizUser',
        isLogged: true,
        experience: 0,
    };

    const [allQuizzes, setAllQuizzes] = useState([]);
    const [selectQuizToStart, setSelectQuizToStart] = useState(null);
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
          const savedUserData = localStorage.getItem('user');
          return savedUserData ? JSON.parse(savedUserData) : defaultUser;
        }
        return defaultUser;
      });
    
      useEffect(() => {
        if (typeof window !== 'undefined' && user !== defaultUser) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }, [user]);


    useEffect(() => {
        setAllQuizzes(quizzesData);
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                allQuizzes,
                setAllQuizzes,
                quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
                userObject : {user,setUser},
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default function useGlobalContextProvider() {
    return useContext(GlobalContext);
}
