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
      <div className="w-1/2 p-4">
        <h1 className="text-xl font-bold mb-4">Cleaned Places</h1>
        <h1 className="text-xl font-bold mb-4">By the Community</h1>
        <ul>
          {cleanedPlaces.map((place, index) => (
            <li key={index} className="mb-2 border shadow-md">
              <p>{place.name}</p>
              <p>Creator:{place.creator.name}</p>
              <img src={place.photo} alt="" />
              <p></p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-8/12 p-4 mb-12">
        <div className="bg-blue-400 rounded-lg p-6 text-blue mb-4 border shadow-sm">
          <h1 className=" text-white mb-4 text-xl">
            Walk, Run, Bike, Explore the planet
          </h1>
          <p className="mb-4">
            Help spot dirty places by adding new locations to our database
          </p>
          <p>Share the location, take a picture, and add a description</p>
        </div>
        <div className="bg-blue-400 rounded-lg p-6 text-blue mb-4">
          <h1 className="text-xl text-white mb-4">
            Create events and connect with like-minded individuals
          </h1>
          <p className="mb-4 text-blue">
            Organize events for cleaning up existing places or create new ones
          </p>
          <p className="mb-4 text-blue">
            Join events created by others and contribute to a cleaner
            environment
          </p>
        </div>
        <div className="bg-blue-400 rounded-lg p-6">
          <h1 className="mb-4 text-white text-xl">Think Broader</h1>
          <p className="mb-4 text-blue">
            Help preserve a better environment for future generations
          </p>
          <p className="mb-4 text-blue">
            Contribute to low internet and data usage while ensuring high
            security
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
