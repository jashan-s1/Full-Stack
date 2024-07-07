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

Moving to Home to start your journey here ...

</span>

</div>
);
}

export default PlaceHolder;