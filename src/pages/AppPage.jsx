import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import Api from "../service/myApi";

function AppPage() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    markersInfos();
  }, []);

  async function markersInfos() {
    try {
      const response = await Api.get(`/garbagesPlaces`);

      console.log(response.data);
      setMarkers(response.data);
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  }

  return (
    <div>
      <p>AppPage</p>
      <MapContainer
        style={{ width: "100%", height: "400px" }}
        center={[51.505, -0.09]}
        zoom={13}
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
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default AppPage;
