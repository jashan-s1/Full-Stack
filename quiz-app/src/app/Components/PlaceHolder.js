import React from 'react';
import Image from 'next/image';
function PlaceHolder (props) {
return (
<div className="poppins flex-col gap-3 p-4 flex justify-center items-center ">
{/* Icon Container */}
<Image src="/inbox.png" alt="" width={150} height={150} />

{/* Title */}

<h2 className="text-3xl font-bold">Quizzes await! Make one.</h2>

{/* Call To Action */}

<span className="text-[17px] font-light">

Click below to begin your journey here ...

</span>

{/* button */}

<button className="p-4 px-5 text-white text-[15px] bg-green-700 rounded-md">

Create my first Quiz
</button>
</div>
);
}

export default PlaceHolder;