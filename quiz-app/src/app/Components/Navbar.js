"use client"; // Add this directive to use client-side rendering

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useGlobalContextProvider from "../ContextApi";

function Navbar() {
  const { userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject;
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user.islogged) {
      setUsername(user.username);
    }
  }, [user]);

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    setUser({ islogged: false, username: "", quizCount: 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameInput = e.target.elements.username.value;
    if (usernameInput) {
      setUser({ ...user, islogged: true, username: usernameInput, quizCount: 0 });
      setShowModal(false);
    }
  };

  return (
    <>
      <nav className="poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10 navbar-shadow bg-white">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <a className="flex gap-1 items-center">
              <Image src="/ideas.png" alt="" width={40} height={50} />
              <h2 className="text-2xl font-bold flex gap-2">
                Quiz <span className="text-green-700">World</span>
              </h2>
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            {user.islogged && (
              <span className="text-sm font-medium">
                Welcome {username} (Experience: {user.quizCount})
              </span>
            )}
            <button
              className="block rounded-lg bg-green-700 px-7 py-3 text-sm font-medium text-white"
              type="button"
              onClick={user.islogged ? handleLogout : handleLogin}
            >
              {user.islogged ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </nav>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Enter Username</h2>
            <form onSubmit={handleSubmit}>
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
    </>
  );
}

export default Navbar;
