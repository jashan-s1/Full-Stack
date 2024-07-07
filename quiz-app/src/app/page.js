'use client'; // Ensure client-side rendering

import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import QuizzesArea from './Components/QuizzesArea';
import PlaceHolder from './Components/PlaceHolder';
import useGlobalContextProvider from './ContextApi';

export default function Home() {
  const { userObject, quizToStartObject } = useGlobalContextProvider();
  const { user } = userObject;
  const { setSelectQuizToStart } = quizToStartObject;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSelectQuizToStart(null);
    setIsLoading(false); // Set loading state to false once component mounts
  }, []);

  if (isLoading) {
    return null; // Return null or a loading spinner while waiting for initial state
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>
      {user.islogged ? <QuizzesArea /> : <PlaceHolder />} {/* Conditionally render QuizzesArea or Placeholder */}
    </div>
  );
}
