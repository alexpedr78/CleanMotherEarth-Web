import { useState, useEffect } from "react";
import Api from "../service/myApi";
import Map from "../components/Map/Map";
import FormPlaceAppPage from "../components/formPlaceAppPage/formPlaceAppPage.jsx";
import AddAnEvent from "../components/AddAnEvent/AddAnEvent.jsx";
function AppPage() {
  const [markers, setMarkers] = useState([]);
  const [filter, setFilter] = useState(null);
  const [joining, setJoining] = useState([]);
  const [placeForm, setPlaceForm] = useState(null);
  const [clickedPosition, setClickedPosition] = useState({ long: "", lat: "" });
  const [showForm, setShowForm] = useState(false);

  async function fetchMarkersData() {
    try {
      let requestUrl = "";
      if (filter === "place") {
        requestUrl = "garbagesPlaces";
      }
      if (filter === "event") {
        requestUrl = "events";
      }
      const response = await Api.get(`/${requestUrl}`);
      setMarkers(response.data);
    } catch (error) {
      console.log("Error fetching marker info:", error);
    }
  }

  async function fetchIfUserIsJoining() {
    try {
      const response = await Api.get("/joining");
      const newArrayOfId = response.data.map((elem) => elem.eventId);
      setJoining(newArrayOfId);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMarkersData();
    fetchIfUserIsJoining();
  }, [filter, clickedPosition]);

  function handleClickButton(value) {
    setFilter(value);
    setPlaceForm(value);
  }

  if (!joining) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex text-3xl mb-6 md:text-4xl lg:text-5xl justify-center font-bold mb-4 text-blue-900">
        CleanMoTheurEarth
      </div>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row mb-8 md:mb-12">
          <div className="md:w-1/2 mr-4 mb-4 md:mb-0">
            <div className="flex flex-col  justify-center md:justify-between mb-4">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white mb-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleClickButton("place")}
              >
                Show the Places
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleClickButton("event")}
              >
                Show the Events
              </button>
            </div>
            {placeForm === "place" && (
              <FormPlaceAppPage
                clickedPosition={clickedPosition}
                setClickedPosition={setClickedPosition}
                setShowForm={setShowForm}
                showForm={showForm}
              />
            )}
            {placeForm === "event" && (
              <p className="mt-2 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Join an Event by Clicking on a Marker
              </p>
            )}
          </div>
          <div className="md:w-1/2 flex-1 relative z-0">
            <Map
              clickedPosition={clickedPosition}
              setClickedPosition={setClickedPosition}
              filter={filter}
              markers={markers}
              setJoining={setJoining}
              joining={joining}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppPage;
