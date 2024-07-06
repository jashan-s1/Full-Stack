'use client';

import React, { useEffect } from 'react';
import useGlobalContextProvider from '@/app/ContextApi';
import QuizStartHeader from '@/app/Components/QuizStartPage/QuizStartHeader';
import QuizStartQuestions from '@/app/Components/QuizStartPage/QuizStartQuestions';
import Image from 'next/image';

function Page() {
    const { allQuizzes, quizToStartObject } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;

    useEffect(() => {
        if (selectQuizToStart === null) {
            window.location.href = '/';
        }
    }, [selectQuizToStart]);

    return (
        <div className="poppins flex flex-col px-24 mt-[35px] ">
            {selectQuizToStart === null ? (
                <div className="h-screen flex flex-col gap-2 items-center justify-center"> 
                    <Image src="/inbox.png" alt="Inbox" width={180} height={180} />
                    <h2 className="text-xl font-bold">Please select your quiz first...</h2>
                    <span className="font-light">You will be redirected to the home page</span>
                </div>
            ) : (
                <>
                    <QuizStartHeader />
                    <div className="mt-10 flex items-center justify-center">
                        <QuizStartQuestions />
                    </div>
                </>
            )}
        </div>
    );
}

export default Page;
