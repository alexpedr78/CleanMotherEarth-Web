import { useEffect, useState } from "react";
import Api from "../../service/myApi";

function SelectProfilepage({ setSelect, select }) {
  const [dataActivity, setDataActivity] = useState(null);

  async function fetchTheRightActivity() {
    try {
      let URL = "";

      if (select === "event") {
        URL = "joining/yourEvents";
      }
      if (select === "events") {
        URL = "events";
      }
      if (select === "place") {
        URL = "garbagesPlaces/yourPlaces";
      }
      if (select === "comment") {
        URL = "comments/yourComments";
      }

      const response = await Api.get(`/${URL}`);
      console.log(response.data);
      setDataActivity(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTheRightActivity();
  }, [select]);

  async function handleSelectChange(e) {
    setSelect(e.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="p-4 md:p-8">
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mb-4"
          name=""
          id=""
          onChange={handleSelectChange}
          value={select || ""}
        >
          <option value="">Check Your Activity</option>
          <option value="event">See all the events you joined</option>
          <option value="events">See all the events you created</option>
          <option value="comment">See all the comments you wrote</option>
          <option value="place">See all the places you discovered</option>
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataActivity && Array.isArray(dataActivity) ? (
            dataActivity.map((elem, index) => (
              <div key={index} className="bg-white p-4 shadow rounded-md">
                <h2 className="text-lg font-semibold">
                  {elem.name || (elem.eventId && elem.eventId.name) || ""}
                </h2>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No activity data available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectProfilepage;
