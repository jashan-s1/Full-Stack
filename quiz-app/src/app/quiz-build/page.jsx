import React from 'react';
import QuizBuildNav from '../Components/QuizBuildPage/QuizBuildNav';
import QuizBuildTitle from '../Components/QuizBuildPage/QuizBuildTitle';
import QuizBuildQuestions from '../Components/QuizBuildPage/QuizBuildQuestions';

function Page(props){
    return (
        <div className="mx-16 poppins">
            <QuizBuildNav/>
            <QuizBuildTitle/>
            <QuizBuildQuestions/>
        </div>
    )

}

export default Page;