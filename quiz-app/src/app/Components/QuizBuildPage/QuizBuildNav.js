import React from 'react';
import Image from 'next/image';

function QuizBuildNav() {
    return (
        <div className ="poppins my-12 flex justify-between items-center " >
<div className="flex gap-2 items-center">
<Image src="/abc.png" alt="" height={100} width={100}/>
<span className="text-3xl">
Quiz <span className="text-green-700 font-bold">Builder</span>
</span>
</div>
<button className="p-2 px-4 bg-green-700 rounded-md text-white">
Save
</button>
</div>
);
}


export default QuizBuildNav;