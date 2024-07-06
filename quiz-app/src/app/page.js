'use client';
import { useEffect } from 'react';
import Navbar from './Components/Navbar';
import QuizzesArea from './Components/QuizzesArea';
import useGlobalContextProvider from './ContextApi';

export default function Home() {
  const { quizToStartObject } = useGlobalContextProvider();
  const { setSelectQuizToStart } = quizToStartObject;

  useEffect(() => {
    setSelectQuizToStart(null);
  }, []);
  return (

    <div>
      <header>
        <Navbar />
      </header>
      <QuizzesArea />
    </div>
  );
}

