import React from 'react';
import QuizCard from './QuizCard';
import Image from 'next/image';
import PlaceHolder from './PlaceHolder';
import useGlobalContextProvider from '../ContextApi';

function QuizzesArea(props) {
  const {allQuizzes} = useGlobalContextProvider();
  return (
    <div className=" poppins flex items-center justify-center py-10">
      {allQuizzes.length === 0 ? (
        <PlaceHolder />
      ) : (
        <div>
        <div className="flex flex-col items-center">
        <Image src="/speech-bubble.png" alt="" width={130} height={130} />
          <h2 className="text-xl font-bold text-center">My Quizzes</h2>
          <div className="mt-10 flex gap-2 flex-wrap justify-center">
            {allQuizzes.map((singleQuiz,quizIndex)=>(
                <div key={quizIndex}>
                <QuizCard singleQuiz={singleQuiz} />
                </div>
            ))}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default QuizzesArea;
