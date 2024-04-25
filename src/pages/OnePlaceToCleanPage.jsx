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
      setPlaceInfos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOnePlace();
  }, []);

  if (!placeInfos) {
    return <p className="text-center text-red-500">No data</p>;
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{placeInfos.name}</h2>
        <p className="text-gray-700 mb-4">{placeInfos.description}</p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            Creator: {placeInfos.creator ? placeInfos.creator.name : "Unknown"}
          </p>
          <p className="text-gray-600">
            Description :
            {placeInfos.description ? placeInfos.description : "Unknown"}
          </p>
          <p className="text-gray-600">
            Created at: {formatDate(placeInfos.createdAt)}
          </p>
        </div>
        {placeInfos.photo && (
          <div className="mt-4">
            <img
              src={placeInfos.photo}
              alt={placeInfos.name}
              className="w-3/12 aspect-auto	rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="mt-6 mb-8">
        <AddAnEvent placeInfos={placeInfos} placeId={placeId} />
      </div>
    </div>
  );
}

export default OnePlaceToCleanPage;
