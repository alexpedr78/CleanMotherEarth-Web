import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
    <div className="absolute bottom-0 left-0 w-full h-full">
      <MapContainer
        style={{ width: "100%", height: "400px" }}
        center={[51.505, -0.09]}
        zoom={3}
        scrollWheelZoom={false}
      >
        <GetPositionOnClick
          clickedPosition={clickedPosition}
          setClickedPosition={setClickedPosition}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                <div className="font-semibold">{marker.name}</div>
                <div>{marker._id}</div>
                <div>
                  {marker.position ? (
                    <div>
                      lat: {marker.position.lat}, long: {marker.position.long}
                    </div>
                  ) : (
                    "No position data available"
                  )}
                </div>
                <div>
                  {filter === "place" ? (
                    <AddAnEventButton markerId={marker._id} />
                  ) : (
                    ""
                  )}
                </div>
                {filter === "event" && (
                  <div>
                    {joining.includes(marker._id) && (
                      <button
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                        onClick={() => handleCancelJoining(marker._id)}
                      >
                        Cancel Joining
                      </button>
                    )}{" "}
                    {joining && joining.length === 0 && (
                      <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                        onClick={() => handleJoiningClick(marker._id)}
                      >
                        Join Event
                      </button>
                    )}
                  </div>
                )}
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
