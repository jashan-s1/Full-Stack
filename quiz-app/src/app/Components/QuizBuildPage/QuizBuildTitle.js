import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';


function QuizBuildTitle(props) {
    return (
        <div className="p-3 flex justify-between border border-green-700 rounded-md">
            <div className="flex gap-2">
                <div className="flex gap-2 items-center">
                    <div className="bg-green-700 px-4 py-1 rounded-md text-white">1</div>

                    <span className="font-bold">Quiz Name: </span>

                </div>

                <input

                    className="outline-none border-b-2 pt-1 w-[300px] text-[13px]"
                    placeholder="Enter the Name Of The Quiz ..."
                />
            </div>

            <Image src="/title.png" alt="" height={40} width={40}/>
        </div>
    );
}

export default QuizBuildTitle;