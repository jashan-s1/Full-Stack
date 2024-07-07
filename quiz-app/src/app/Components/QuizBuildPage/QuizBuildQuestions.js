'use client';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Assuming you meant 'faTimes' instead of 'faXmark'

function QuizBuildQuestions(props) {
    const [quizQuestions, setQuizQuestions] = useState([
        { id: uuidv4(), mainQuestion: '' },
    ]);

    function addNewQuestion() {
        const newQuestion = { id: uuidv4(), mainQuestion: '' };
        setQuizQuestions([...quizQuestions, newQuestion]);
    }

    function deleteQuestion(singleQuestion) {
        const updatedQuestions = quizQuestions.filter(question => question.id !== singleQuestion.id);
        setQuizQuestions(updatedQuestions);
    }

    return (
        <div className="p-3 mt-6 flex justify-between border border-green-700 rounded-md">
            <div className="flex gap-2 flex-col w-full">
                {/* Header Area */}
                <div className="flex gap-2 items-center">
                    <div className="bg-green-700 px-4 py-1 rounded-md text-white">2</div>
                    <span className="font-bold">Quiz Questions: </span>
                </div>
                {/* Questions Area */}
                {quizQuestions.map((singleQuestion, questionIndex) => (
                    <div
                        key={singleQuestion.id}
                        className="border ml-5 p-4 mt-4 border-green-700 border-opacity-50 rounded-md relative"
                    >
                        <SingleQuestion questionIndex={questionIndex} />
                        {questionIndex !== 0 && (
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="text-red-600 absolute top-2 right-3 cursor-pointer"
                                onClick={() => deleteQuestion(singleQuestion)}
                            />
                        )}
                    </div>
                ))}
                {/* Button Area */}
                <div className="w-full flex justify-center mt-3">
                    <button
                        onClick={addNewQuestion}
                        className="p-3 bg-green-700 rounded-md text-white w-[210px] text-[13px]"
                    >
                        Add a New Question
                    </button>
                </div>
            </div>
        </div>
    );
}

function SingleQuestion({ questionIndex }) {
    return (
        <div className="w-full">
            <div className="flex items-center gap-3">
                <div className="flex gap-2 text-[15px] border-gray-200">
                    <span>Question</span>
                    <span>{questionIndex + 1}</span>
                </div>
                <textarea
                    className="border border-gray-200 rounded-md p-3 ml-3 w-[90%] h-[50px] resize-none text-[13px] outline-none"
                    placeholder="Your Question Here..."
                />
            </div>
        </div>
    );
}

export default QuizBuildQuestions;
