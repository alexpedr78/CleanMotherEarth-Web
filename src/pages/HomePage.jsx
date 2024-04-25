import { useState, useEffect } from "react";
import Api from "../service/myApi";

function HomePage() {
  const [cleanedPlaces, setCleanedPlaces] = useState([]);

  async function fetchStaticData() {
    try {
      const response = await Api.get("/garbagesPlaces/cleaned/all");
      setCleanedPlaces(response.data.slice(0, 4) || ["Beach", "Park", "River"]);
    } catch (error) {
      console.error("Error fetching static data:", error);
    }
  }

  useEffect(() => {
    fetchStaticData();
  }, []);

  return (
    <div className="flex justify-between">
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4">Cleaned Places</h1>
        <h2 className="text-lg font-bold mb-4">By the Community</h2>
        <ul className="grid gap-4">
          {cleanedPlaces.map((place, index) => (
            <li
              key={index}
              className="bg-white border rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={place.photo}
                alt={place.name}
                className="w-full h-auto"
              />
              <div className="p-4">
                <p className="text-lg font-semibold">{place.name}</p>
                <p className="text-sm text-gray-600">
                  Creator: {place.creator.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:w-8/12 lg:w-6/12 xl:w-4/12 p-4 mb-12 flex flex-col gap-8">
        <div className="bg-blue-400 rounded-lg p-6 text-blue shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          <h1 className="text-white text-2xl mb-4 font-bold">
            Walk, Run, Bike, Explore the planet
          </h1>
          <p className="mb-4 text-lg">
            Help spot dirty places by adding new locations to our database
          </p>
          <p className="text-lg">
            Share the location, take a picture, and add a description
          </p>
        </div>
        <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-blue-400 rounded-lg p-6 text-blue shadow-md">
          <h1 className="text-white text-2xl mb-4 font-bold">
            Create events and connect with like-minded individuals
          </h1>
          <p className="mb-4 text-lg">
            Organize events for cleaning up existing places or create new ones
          </p>
          <p className="mb-4 text-lg">
            Join events created by others and contribute to a cleaner
            environment
          </p>
        </div>
        <div className="bg-blue-400 rounded-lg p-6 text-blue shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          <h1 className="text-white text-2xl mb-4 font-bold">Think Broader</h1>
          <p className="mb-4 text-lg">
            Help preserve a better environment for future generations and our
          </p>
          <p className="mb-4 text-lg">
            Low Internet and Data Storage, Real Impacts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
