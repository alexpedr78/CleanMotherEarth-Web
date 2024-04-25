import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import Api from "../../service/myApi";
import GetPositionOnClick from "./GetPositionOnClick";
import AddAnEventButton from "./AddAnEventButton";

function Map(props) {
  const {
    markers,
    filter,
    setJoining,
    joining,
    clickedPosition,
    setClickedPosition,
  } = props;

  const [mapWidth, setMapWidth] = useState("100%");

  useEffect(() => {
    const updateMapWidth = () => {
      const width = window.innerWidth > 768 ? "80%" : "100%";
      setMapWidth(width);
    };

    updateMapWidth();
    window.addEventListener("resize", updateMapWidth);

    return () => {
      window.removeEventListener("resize", updateMapWidth);
    };
  }, []);

  async function handleJoiningClick(markerId) {
    try {
      let data = { _id: markerId };
      const response = await Api.post("/joining", data);
      setJoining([...joining, markerId]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCancelJoining(markerId) {
    try {
      const response = await Api.delete(`/joining/map/${markerId}`);
      setJoining((prevJoining) => prevJoining.filter((id) => id !== markerId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-full mb-8 z-10">
      <MapContainer
        style={{
          width: mapWidth,
          height: "400px",
          border: "2px solid #4A90E2",
          borderRadius: "12px",
        }}
        center={[51.505, -0.09]}
        zoom={3}
        scrollWheelZoom={false}
      >
        <GetPositionOnClick
          clickedPosition={clickedPosition}
          setClickedPosition={setClickedPosition}
        />
        <TileLayer
          attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
          minZoom={0}
          maxZoom={20}
        />

        {Array.isArray(markers) && markers.length !== 0 ? (
          markers.map((marker, index) => (
            <Marker
              position={
                marker.position
                  ? [
                      parseFloat(marker.position.lat),
                      parseFloat(marker.position.long),
                    ]
                  : [0, 0]
              }
              key={index + 1}
            >
              <Popup>
                <div className="font-semibold text-lg text-blue-900">
                  {marker.name}
                </div>
                <div className="text-gray-600">{marker._id}</div>
                <div className="text-gray-600 mt-2 border-t pt-2">
                  {marker.position ? (
                    <div>
                      <span className="font-bold">Latitude:</span>{" "}
                      {marker.position.lat}
                    </div>
                  ) : (
                    <div>No position data available</div>
                  )}
                  {marker.position ? (
                    <div>
                      <span className="font-bold">Longitude:</span>{" "}
                      {marker.position.long}
                    </div>
                  ) : null}
                </div>
                <div className="mt-4">
                  {filter === "place" && (
                    <AddAnEventButton markerId={marker._id} />
                  )}
                  {filter === "event" && (
                    <button
                      className={`px-4 py-2 rounded-md shadow-md focus:outline-none ${
                        joining.includes(marker._id)
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                      onClick={() =>
                        joining.includes(marker._id)
                          ? handleCancelJoining(marker._id)
                          : handleJoiningClick(marker._id)
                      }
                    >
                      {joining.includes(marker._id)
                        ? "Cancel Joining"
                        : "Join Event"}
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))
        ) : (
          <div>No markers available</div>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
