import React from 'react';
import QuizCard from './QuizCard';
import Image from 'next/image';
import useGlobalContextProvider from '../ContextApi';

function QuizzesArea({ props }) {
  const { allQuizzes, userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;

  console.log('allQuizzes:', allQuizzes);
  console.log('user:', user);

  return (
    <div className="poppins flex items-center justify-center py-10">
      <div>
        {user.islogged ? (
          <>
            {allQuizzes.length === 0 ? (
                <div>Redirecting to Quizz Areaa.....</div>
            ) : (
              <div>
                <div className="flex flex-col items-center">
                  <Image src="/speech-bubble.png" alt="" width={130} height={130} />
                  <h2 className="text-xl font-bold text-center">My Quizzes</h2>
                  <div className="mt-10 flex gap-5 flex-wrap justify-center">
                    {allQuizzes.map((singleQuiz, quizIndex) => (
                      <div key={quizIndex}>
                        <QuizCard singleQuiz={singleQuiz} />
                      </div>
                    ))}
                    <div
                      onClick={() => {
                        window.location.href = '/quiz-build';
                      }}
                      className="cursor-pointer justify-center items-center rounded-[10px] w-[230px] flex flex-col gap-2 border border-black-200 bg-white p-4"
                    >
                      <Image
                        src={'/plus.png'}
                        width={150}
                        height={150}
                        alt=""
                        style={{ opacity: 0.2 }}
                      />
                      <span className="select-none opacity-40">Add a New Quiz</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
            <div>Redirecting to Quizz Areaa.....</div>
        )}
      </div>
    </div>
  );
}

export default QuizzesArea;
