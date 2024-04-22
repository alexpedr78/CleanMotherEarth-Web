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

  return (
    <div className="p-8">
      <div className="flex text-3xl md:text-4xl lg:text-5xl justify-center font-bold mb-4 text-blue-900">
        CleanMoTheurEarth
      </div>

      <div className="flex flex-col md:flex-row justify-center md:justify-between">
        <div className="md:mr-4 mb-4 md:mb-0">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleClickButton("place")}
          >
            Places That need our Help
          </button>

          {placeForm === "place" && (
            <FormPlaceAppPage
              clickedPosition={clickedPosition}
              setClickedPosition={setClickedPosition}
              setShowForm={setShowForm}
              showForm={showForm}
            />
          )}
        </div>
        <div>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleClickButton("event")}
          >
            Events
          </button>
          {placeForm === "event" && (
            <button className="mt-2 bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Find an event by clicking on the marker
            </button>
          )}
        </div>
      </div>

      <div className="flex-2/3 w-9/12 relative">
        <Map
          clickedPosition={clickedPosition}
          setClickedPosition={setClickedPosition}
          placeForm={placeForm}
          setPlaceForm={setPlaceForm}
          setMarkers={setMarkers}
          filter={filter}
          markers={markers}
          setJoining={setJoining}
          joining={joining}
        />
      </div>
    </div>
  );
}

export default AppPage;
