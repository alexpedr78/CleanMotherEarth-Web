import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Api from "../service/myApi";
import AddAnEvent from "../components/AddAnEvent/AddAnEvent";
function OnePlaceToCleanPage() {
  const { placeId } = useParams();
  const [placeInfos, setPlaceInfos] = useState(null);

  async function fetchOnePlace() {
    try {
      let response = await Api.get(`garbagesPlaces/${placeId}`);
      console.log(response.data);
      setPlaceInfos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOnePlace();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (!placeInfos) {
    return <p>No data</p>;
  }

  return (
    <div>
      <div>
        <p>{placeInfos && placeInfos.name ? placeInfos.name : null}</p>
        <p>
          {placeInfos && placeInfos.description ? placeInfos.description : null}
        </p>
        <p>
          {placeInfos && placeInfos.creator ? placeInfos.creator.name : null}
        </p>
        <p>
          {placeInfos && placeInfos.createdAt ? placeInfos.createdAt : null}
        </p>
      </div>
      <AddAnEvent />
    </div>
  );
}

export default OnePlaceToCleanPage;
