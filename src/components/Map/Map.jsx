import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function Map(props) {
  const { markers } = props;
  return (
    <div>
      {" "}
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
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
