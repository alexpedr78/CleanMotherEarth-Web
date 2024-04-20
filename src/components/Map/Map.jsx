import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Api from "../../service/myApi";

function Map(props) {
  const { markers, filter, setJoining, joining } = props;

  async function handleJoiningClick(markerId) {
    try {
      let dataToSend = { _id: markerId };
      const response = await Api.post("/joining", dataToSend);

      setJoining([...joining, markerId]);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleCancelJoining(markerId) {
    // console.log(joining);
    try {
      const response = await Api.delete(`/joining/${markerId}`);
      setJoining((prev) => {
        return prev.filter((id) => id !== markerId);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <MapContainer
        style={{ width: "100%", height: "400px" }}
        center={[51.505, -0.09]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => (
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
              <div>{marker.name}</div>
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
              {filter === "event" ? (
                <div>
                  {joining.includes(marker._id) ? (
                    <button onClick={() => handleCancelJoining(marker._id)}>
                      Cancel Joining
                    </button>
                  ) : (
                    <button onClick={() => handleJoiningClick(marker._id)}>
                      Join Event
                    </button>
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
