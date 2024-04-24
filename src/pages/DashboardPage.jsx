import { useEffect, useState } from "react";
import Api from "../service/myApi";
import { Await } from "react-router";

function DashboardPage() {
  const [infosToDisplay, setInfosToDisplay] = useState(null);
  const [value, setValue] = useState(null);
  const [reload, setReload] = useState(false);
  async function fetchInfos() {
    try {
      let URL;
      if (value === "user") {
        URL = "users/admin";
      } else if (value === "place") {
        URL = "garbagesPlaces/";
      } else if (value === "event") {
        URL = "events/admin";
      }
      if (URL) {
        const response = await Api.get(`/${URL}`);
        setInfosToDisplay(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchInfos();
  }, [value, reload]);

  async function handleDelete(id) {
    try {
      let URL;
      if (value === "user") URL = `users/${id}`;
      else if (value === "place") {
        URL = `garbagesPlaces/${id}`;
      } else if (value === "event") {
        URL = `events/${id}`;
      }
      if (URL) {
        let response = await Api.delete(`/${URL}`);
      }
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }
  function handleChange(e) {
    setValue((prevValue) => e.target.value);
  }

  return (
    <div className="mx-auto max-w-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <select
          onChange={(e) => handleChange(e)}
          value={value}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={null}>choose</option>
          <option value="user">See all Users</option>
          <option value="place">See all Places</option>
          <option value="event">See all Events</option>
        </select>
      </div>

      {infosToDisplay && value ? (
        infosToDisplay.map((elem) => (
          <div key={elem._id} className="mb-4">
            <p className="font-bold">{elem.name}</p>
            {elem.photo && (
              <img
                src={elem.photo}
                alt=""
                className="mt-2 w-full h-auto rounded-md"
              />
            )}
            {elem.avatar && (
              <img
                src={elem.avatar}
                alt=""
                className="mt-2 w-full h-auto rounded-md"
              />
            )}
            <button onClick={() => handleDelete(elem._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>Pick A Filter</p>
      )}
    </div>
  );
}

export default DashboardPage;
