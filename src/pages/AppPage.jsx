import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import Api from "../service/myApi";
import Map from "../components/Map/Map";

function AppPage() {
  const [markers, setMarkers] = useState([]);
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    markersInfos();
  }, [filter]);

  async function markersInfos() {
    try {
      let requestUrl = "";
      if (filter === "place") {
        requestUrl = "garbagesPlaces";
      }
      if (filter === "event") {
        requestUrl = "events";
      }
      const response = await Api.get(`/${requestUrl}`);
      //import.meta.env.VITE_BACKEND_URL
      console.log(response.data);
      setMarkers(response.data);
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  }
  function handleClickButton(e) {
    setFilter(e.target.value);
    console.log(filter);
  }
  return (
    <div>
      <p className="text-3xl font-bold underline">AppPage</p>
      <div>
        <button
          value={"place"}
          onClick={(e) => {
            handleClickButton(e);
          }}
        >
          PlacesToClean
        </button>
        <button value={"event"} onClick={handleClickButton}>
          Events
        </button>
        <Map markers={markers} />
      </div>
    </div>
  );
}

export default AppPage;
