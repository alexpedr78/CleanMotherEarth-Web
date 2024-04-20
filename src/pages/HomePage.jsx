import { useState, useEffect } from "react";

function HomePage() {
  useEffect(() => {}, []);

  const cleanedPlaces = ["Beach", "Park", "River"];

  return (
    <div className="flex justify-between h-screen">
      {/* List of cleaned places */}
      <div className="bg-gray-200 m-2 p-4 flex-grow">
        <ul className="flex flex-col justify-around h-full">
          {cleanedPlaces.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
      </div>
      {/* Description divs */}
      <div className="flex flex-col justify-center items-center p-4">
        <div className="bg-gradient-to-r from-blue-200 to-blue-400 text-white py-3 px-4 rounded-lg shadow-md mb-4 text-center">
          Walk around the planet and help spot the dirty places
        </div>
        <div className="bg-gradient-to-r from-blue-200 to-blue-400 text-white py-3 px-4 rounded-lg shadow-md mb-4 text-center">
          Create events and discover all the people wanting to do just the same
          as you
        </div>
        <div className="bg-gradient-to-r from-blue-200 to-blue-400 text-white py-3 px-4 rounded-lg shadow-md mb-4 text-center">
          Help give a better heritage to our children
        </div>
        <div className="bg-gradient-to-r from-blue-200 to-blue-400 text-white py-3 px-4 rounded-lg shadow-md mb-4 text-center">
          Low internet, low data usage, high security
        </div>
      </div>
    </div>
  );
}

export default HomePage;
