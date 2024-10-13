import { useState, useEffect } from "react";
import Api from "../service/myApi";
import Map from "../components/Map/Map";
import FormPlaceAppPage from "../components/formPlaceAppPage/formPlaceAppPage.jsx";

function AppPage() {
  const [markers, setMarkers] = useState([]);
  const [filter, setFilter] = useState(null);
  const [joining, setJoining] = useState([]);
  const [placeForm, setPlaceForm] = useState(null);
  const [clickedPosition, setClickedPosition] = useState({ long: "", lat: "" });
  const [showForm, setShowForm] = useState(false);
  const [isAButtonClicked, setIsAButtonClicked] = useState(false);

  // Fetch markers data based on filter and clickedPosition changes
  async function fetchMarkersData() {
    try {
      let requestUrl = "";
      if (filter === "place") {
        requestUrl = "garbagesPlaces";
      }
      if (filter === "event") {
        requestUrl = "events";
      }
      if (requestUrl !== "") {
        const response = await Api.get(`/${requestUrl}`);
        setMarkers(response.data);
      }
    } catch (error) {
      console.log("Error fetching marker info:", error);
    }
  }

  // Fetch if user is joining any events
  async function fetchIfUserIsJoining() {
    try {
      const response = await Api.get("/joining");
      const newArrayOfId = response.data.map((elem) => elem.eventId);
      setJoining(newArrayOfId);
    } catch (error) {
      console.log("Error fetching joining status:", error);
    }
  }

  useEffect(() => {
    fetchMarkersData();
    fetchIfUserIsJoining();
  }, [filter, clickedPosition]);

  function handleClickButtonEveryTime() {
    setIsAButtonClicked(true);
  }

  // Handle click on filter buttons
  function handleClickButton(value) {
    setFilter(value);
    setPlaceForm(value);
  }

  // Render loading message while joining state is being fetched
  if (!joining) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative overflow-hidden z-0 min-h-screen">
      {/* Map Component */}
      <Map
        clickedPosition={clickedPosition}
        setClickedPosition={setClickedPosition}
        filter={filter}
        markers={markers}
        setJoining={setJoining}
        joining={joining}
        scrollWheelZoom={true}
        // zoomControl={true} // Ensure zoom control is enabled
      />

      {/* Overlay Content */}
      <div className="absolute top-4 left-4 z-10 p-4 pointer-events-none">
        <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-md pointer-events-auto">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
            CleanMotherEarth
          </h2>
          <div className="flex flex-col md:flex-row mb-4 md:mb-8">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white mb-2 md:mb-0 md:mr-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {handleClickButton('place'); handleClickButtonEveryTime()}}
            >
              Show the Places
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleClickButton('event')}
            >
              Show the Events
            </button>
          </div>
          {/* Conditional rendering based on placeForm state */}
          {placeForm === 'place' ? (
            <FormPlaceAppPage
              clickedPosition={clickedPosition}
              setClickedPosition={setClickedPosition}
              setShowForm={setShowForm}
              showForm={showForm}
            />
          ) : placeForm === 'event' ? (
            <p className="mt-2 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center">
              Join an Event by Clicking on a Marker
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AppPage;
