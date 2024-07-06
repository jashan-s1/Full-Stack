'use client';

import React, { useEffect, useState } from 'react';

import useGlobalContextProvider from '@/app/ContextApi';
import { Exo } from 'next/font/google';

function QuizStartQuestions({onUpdateTime}) {
    const time=10;

    const { quizToStartObject , allQuizzes , setAllQuizzes } = useGlobalContextProvider();
    const { selectQuizToStart } = quizToStartObject;
    const { quizQuestions } = selectQuizToStart;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [indexOfQuizSelected, setIndexOfQuizSelected]= useState(null);
    const [isQuizEnded, setIsQuizEnded] =useState(false);

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
                return currentTime -1;
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
            if(currentQuestionIndex !== quizQuestions.length - 1){
                setTimeout(()=>{
                    setCurrentQuestionIndex((current)=>{
                        return current +1;
                    });
                },1000);
            }
        }
    },[timer]);

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

        if(
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
            .answeredResult===-1
        ){
            console.log('please select an answer');
            return ;
        }

        allQuizzes[indexOfQuizSelected].quizQuestions[
            currentQuestionIndex
        ].statistics.totalAttempts +=1;

        if(
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
            .answeredResult !== 
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
            .correctAnswer

        ){
            allQuizzes[indexOfQuizSelected].quizQuestions[
                currentQuestionIndex
            ].statistics.incorrectAttempts +=1;
            console.log('answer is incorrect');
            return ;
        }

    allQuizzes[indexOfQuizSelected].quizQuestions[
        currentQuestionIndex
    ].statistics.correctAttempts +=1;

    console.log('answer is correct');

        // To avoid going out of the index bound

        if (currentQuestionIndex === quizQuestions.length - 1) {
            setIsQuizEnded(true);
            return;

        } // increment the currentQuestionIndex by 1 to go to the next question 
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

            <div className="flex justify-end mt-7 ">

                <button

                    onClick={() => {

                        moveToTheNextQuestion();

                    }} className=" p-2 px-5 text-[15px] text-white rounded-md bg-green-700 mr-[70px]" I
                >
                    Submit

                </button>

            </div>

        </div>

    );

}

export default QuizStartQuestions;
