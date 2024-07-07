'use client';

import React, { useEffect, useState } from 'react';
import useGlobalContextProvider from '@/app/ContextApi';
import Image from 'next/image';

function QuizStartQuestions({onUpdateTime}) {
    const time=20;

    const { quizToStartObject , allQuizzes , setAllQuizzes } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    const { quizQuestions } = selectQuizToStart;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [indexOfQuizSelected, setIndexOfQuizSelected]= useState(null);
    const [isQuizEnded, setIsQuizEnded] =useState(false);
    const [score,setScore] =useState(0);

    const [timer, setTimer]= useState(time);
    let interval;

    function startTimer(){
        clearInterval(interval);
        setTimer(time);

        interval=setInterval(()=>{
            setTimer((currentTime)=>{
                onUpdateTime(currentTime);
                if(currentTime===0){
                    clearInterval(interval);
                    return 0;
                }
                return currentTime-1;
            })
        },1000);
    }

    useEffect(()=>{
        startTimer();
        return ()=>{
            clearInterval(interval);
        };
    },[currentQuestionIndex]);

    useEffect(()=>{
        if(timer ===0){

            const currentQuizzes=[...allQuizzes];
            currentQuizzes[indexOfQuizSelected].quizQuestions[
                currentQuestionIndex
            ].statistics.totalAttempts +=1;
            currentQuizzes[indexOfQuizSelected].quizQuestions[
                currentQuestionIndex
            ].statistics.incorrectAttempts +=1;

            setAllQuizzes(currentQuizzes);
            if(currentQuestionIndex !== quizQuestions.length - 1){
                setTimeout(()=>{
                    setCurrentQuestionIndex((current)=>{
                        return current +1;
                    });
                },1000);
            } else{
                setIsQuizEnded(true);
                clearInterval(interval);
            }
        }
    },[timer]);
    console.log(allQuizzes);

    useEffect(()=>{
        const interval =setInterval(()=>{
            setTimer((currentTime)=>{
                onUpdateTime(currentTime);
                if(currentTime ===0){
                    clearInterval(interval);
                    return 0;
                }
                return currentTime-1;
            });
        }, 1000);

        return ()=>{
            clearInterval(interval);
        };
    },[]);

// With the useEffect every time the component is loaded up //we need to get the index of the quiz we selected inside // the allquizzes array to update it when we choose the answer

    useEffect(()=> {
        const quizIndexFound= allQuizzes.findIndex( 
            (quiz) =>quiz.id ===selectQuizToStart.id,

); 
       setIndexOfQuizSelected(quizIndexFound);

},[]);

    console.log(allQuizzes);
    useEffect(()=>{
        if(isQuizEnded){
            quizQuestions.forEach((quizQuestions) => {
                quizQuestions.answeredResult = -1;
            });
            console.log('quiz has ended...');
        }
    },[isQuizEnded]);

    function selectChoiceFunction(choiceIndextClicked){
        setSelectedChoice(choiceIndextClicked);
        const currentAllQuizzes= [...allQuizzes];

        currentAllQuizzes[indexOfQuizSelected].quizQuestions[
            currentQuestionIndex
        ].answeredResult=choiceIndextClicked;

        setAllQuizzes(currentAllQuizzes);
    }

    function moveToTheNextQuestion() {
        if (
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .answeredResult === -1
        ) {
            console.log('Please select an answer');
            return;
        }
    
        allQuizzes[indexOfQuizSelected].quizQuestions[
            currentQuestionIndex
        ].statistics.totalAttempts += 1;
    
        if (
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .answeredResult !==
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .correctAnswer
        ) {
            allQuizzes[indexOfQuizSelected].quizQuestions[
                currentQuestionIndex
            ].statistics.incorrectAttempts += 1;
            console.log('Answer is incorrect');
        } else {
            allQuizzes[indexOfQuizSelected].quizQuestions[
                currentQuestionIndex
            ].statistics.correctAttempts += 1;
            setScore((prevState) => prevState + 1);
            console.log('Answer is correct');
        }
    
        // To avoid going out of the index bound
        if (
            currentQuestionIndex === allQuizzes[indexOfQuizSelected].quizQuestions.length - 1
        ) {
            setTimer(0);
            clearInterval(interval);
            setIsQuizEnded(true);
            return;
        }
    
        // Increment the currentQuestionIndex by 1 to go to the next question
        setCurrentQuestionIndex((current) => current + 1);
        setSelectedChoice(null);
    }
    

    return (

        <div className="poppins rounded-sm m-9 w-9/12 ">
            {/* The Question Part */}
            <div className="flex items-center gap-2">
                <div className="bg-green-700 flex justify-center items-center rounded-md w-11 h-11">
                    {currentQuestionIndex + 1}
                </div>
                <p>{quizQuestions[currentQuestionIndex].mainQuestion}</p>
            </div>
            {/* The Answers Part */}
            <div className="mt-7 flex flex-col gap-2">
                {quizQuestions[currentQuestionIndex].choices.map(
                    (choice, indexChoice) => (
                        <div
                            key={indexChoice}
                            onClick={()=>{
                                selectChoiceFunction(indexChoice);  
                            }}  
                            className={`p-3 ml-11 w-10/12 border border-green-700 rounded-md 
                            hover:bg-green-700 hover: text-black transition-all select-none ${
                             selectedChoice ===indexChoice
                             ? 'bg-green-700 text-white'
                             :  'bg-white'
                            }`}
                        >
                            {choice}

                        </div>

                    ),

                )}

            </div>

            {/* Submit Button */}

            <div className="flex justify-center mt-7 mb-5">

            <button
    onClick={() => {
        moveToTheNextQuestion();
    }} 
    disabled={isQuizEnded}
    className={`p-2 px-5 text-[15px] cursor-pointer text-white rounded-md bg-green-700 mr-[70px] ${isQuizEnded ? 'opacity-80' : 'opacity-100'} hover:bg-green-800 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-20`}
>  
    Submit
</button>

                </div>
                {
                    isQuizEnded && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* Background Blur */}
                        <div className="absolute inset-0 bg-opacity-20 backdrop-filter backdrop-blur-md"></div>
    
                        {/* Score Component */}
                        <div className="bg-white p-6 rounded-md border border-gray-350 shadow-lg">
                        <ScoreComponent
                        quizStartParentProps={{
                            setIsQuizEnded,
                            setIndexOfQuizSelected,
                            setCurrentQuestionIndex,
                            setSelectedChoice,
                            score,
                            setScore,
                        }}
                        />
                        </div>
                        </div>
                    )
                }
            </div>
    );
}

export default QuizStartQuestions;

 function ScoreComponent({ quizStartParentProps }) {
    const { quizToStartObject, allQuizzes } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    const numberOfQuestions = selectQuizToStart.quizQuestions.length;

    const {
        setIsQuizEnded,
        setIndexOfQuizSelected,
        setCurrentQuestionIndex,
        setSelectedChoice,
        setScore,
        score,
    } = quizStartParentProps;

    function emojiIconScore() {
        const emojiFaces = [
            'Confused.png',
            'happy.png',
            'very-happy.png',
        ];

        const result = (score / selectQuizToStart.quizQuestions.length) * 100;

        if (result < 25) {
            return emojiFaces[0];
        }
        if (result === 50) {
            return emojiFaces[1];
        }
        return emojiFaces[2];
    }
    console.log(emojiIconScore());

    function tryAgainFunction() {
        setIsQuizEnded(false);
        const newQuizIndex = allQuizzes.findIndex(
            (quiz) => quiz.id === selectQuizToStart.id,
        );
        setIndexOfQuizSelected(newQuizIndex);
        setCurrentQuestionIndex(0);
        setSelectedChoice(null);
        setScore(0);
        console.log(selectQuizToStart);
    }

    return (
        <div className=" flex items-center justify-center rounded-md p-6 bg-white shadow-lg w- transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
    {/* Score */}
    <div className="flex flex-col items-center justify-center gap-6 w-80">
        <Image src={`/${emojiIconScore()}`} alt="" width={100} height={100} className="rounded-full" />
        <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-3xl text-gray-800">Your Score</span>
            <div className="text-2xl text-center text-gray-700">
                {score}/{numberOfQuestions}
            </div>
        </div>
        <button
            onClick={tryAgainFunction}
            className="p-3 bg-green-700 rounded-md text-white px-8 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
            Try Again
        </button>

        {/* Statistics */}
        <div className="w-full flex flex-col gap-2 mt-4">
            <div className="flex items-center justify-center gap-2">
                <Image src="/correct.png" alt="Correct" width={24} height={24} />
                <span className="text-lg text-gray-600">Correct Answers: {score}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Image src="/wrong.png" alt="Incorrect" width={24} height={24} />
                <span className="text-lg text-gray-600">Incorrect Answers: {numberOfQuestions - score}</span>
            </div>
        </div>
        <span
            onClick={() => {
                window.location.href = '/';
            }}
            className="text-green-700 cursor-pointer text-sm mt-6 hover:text-green-800"
        >
            Select Another Quiz
        </span>
    </div>
</div>

    );
}
