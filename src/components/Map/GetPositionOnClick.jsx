import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
const GetPositionOnClick = ({ clickedPosition, setClickedPosition }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setClickedPosition({ lat, long: lng });
      setMarkerPosition({ lat, lng });
    },
  });

  return markerPosition ? (
    <Marker position={markerPosition}>
      <Popup>
        Latitude: {markerPosition.lat}, Longitude: {markerPosition.lng}
      </Popup>
    </Marker>
  ) : null;
};

export default GetPositionOnClick;
