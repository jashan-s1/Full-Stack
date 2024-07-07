"use client"; // Ensure client-side rendering

import React, { useState } from 'react';
import Image from 'next/image';
import useGlobalContextProvider from '../ContextApi';

function PlaceHolder(props) {
  const { userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;
  const [showLoginCard, setShowLoginCard] = useState(false);

  const handleCreateQuizClick = () => {
    if (!user.islogged) {
      setShowLoginCard(true);
    } else {
      window.location.href = '/quiz-build';
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    if (username) {
      setUser({ ...user, islogged: true, username, quizCount: 0 });
      setShowLoginCard(false);
    }
  };

  return (
    <div className="poppins flex-col gap-3 p-4 flex justify-center items-center ">
      <Image src="/inbox.png" alt="" width={150} height={150} />
      <h2 className="text-3xl font-bold">Quizzes await! Make one.</h2>
      <span className="text-[17px] font-light">
        Click below to begin your journey here ...
      </span>
      <button
        className="p-4 px-5 text-white text-[15px] bg-green-700 rounded-md"
        onClick={handleCreateQuizClick}
      >
        Create my first Quiz
      </button>

      {showLoginCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg relative animate-pop">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowLoginCard(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Please Login!</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                name="username"
                className="border p-2 rounded w-full mb-4"
                placeholder="Username"
                required
              />
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceHolder;
