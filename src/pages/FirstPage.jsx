import React from "react";

const AppPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-blue-900 mb-8">
        Welcome to Our App
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-blue-800 mb-4">
        Start exploring and make the most out of our app!
      </p>
      <div className="flex justify-center items-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AppPage;
