import React from "react";
import Image from "next/image";

function Navbar(props){
    return (
        <nav className= " poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10 navbar-shadow p-4 bg-white">
        <div className="sm:flex sm:items-center sm: justify-between">
        <div className="text-center sm:text-left">
            <a className="flex gap-1 items-center">
                <Image
                src="/ideas.png"
                alt=""
                width={40} // Width of the image
                height={50}
            />
        
        <h2 className="text-2xl font-bold flex gap-2">
        Quiz <span className="text-green-700">World</span>
        </h2>
        </a>
        </div>
        
        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        <button
    className="block rounded-lg bg-green-700 px-7 py-3 text-sm font-medium text-white"
    type="button"
>
    Login
</button>

        </div>
        </div>
        </nav>
    );
}

export default Navbar;
