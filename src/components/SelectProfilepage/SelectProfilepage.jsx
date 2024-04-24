import { useEffect, useState } from "react";
import Api from "../../service/myApi";
import SortByDate from "./SortByDate";
import SortByStartingDate from "../SortByStartingDate/SortByStartingDate.js/SortByStartingDate.jsx";
function SelectProfilepage({ setSelect, select }) {
  const [dataActivity, setDataActivity] = useState(null);
  const [update, setUpdate] = useState(false);
  const [formTrigger, setFormTrigger] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
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
      if (select === "-1") {
        URL = "";
      }

      const response = await Api.get(`/${URL}`);
      setDataActivity(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTheRightActivity();
  }, [select, update]);

  async function handleSelectChange(e) {
    setSelect(e.target.value);
  }
  async function handleEdit() {
    setFormTrigger(!formTrigger);
  }
  async function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(id, event) {
    event.preventDefault();

    try {
      let response;
      if (select === "place") {
        response = await Api.put(`/garbagesPlaces/${id}`, formData);
      } else if (select === "events") {
        response = await Api.put(`/events/${id}`, formData);
      } else if (select === "event") {
        response = await Api.put(`/joining/${id}`, formData);
      } else if (select === "comment") {
        response = await Api.put(`/comments/${id}`, formData);
      }

      setUpdate((prevState) => !prevState);
      setFormTrigger(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      if (select === "place") {
        let response = await Api.delete(`/garbagesPlaces/${id}`);
      }
      if (select === "events") {
        let response = await Api.delete(`/events/${id}`);
      }
      if (select === "event") {
        let response = await Api.delete(`/joining/${id}`);
      }
      if (select === "comment") {
        let response = await Api.delete(`/comments/${id}`);
      }
      setUpdate((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="p-4 md:p-8">
        <select
          className="mt-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          name=""
          id=""
          onChange={handleSelectChange}
          value={select}
        >
          <option value="-1">Check Your Activity</option>
          <option value="event">See all the events you joined</option>
          <option value="events">See all the events you created</option>
          <option value="comment">See all the comments you wrote</option>
          <option value="place">See all the places you discovered</option>
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataActivity && Array.isArray(dataActivity) ? (
            <SortByDate
              setDataActivity={setDataActivity}
              dataActivity={dataActivity}
            />
          ) : null}
          {dataActivity && Array.isArray(dataActivity) && select === "event" ? (
            <SortByStartingDate
              setDataActivity={setDataActivity}
              dataActivity={dataActivity}
            />
          ) : null}

          {dataActivity && Array.isArray(dataActivity) && select !== "-1" ? (
            dataActivity.map((elem, index) => (
              <div key={index} className="bg-white p-4 shadow rounded-md">
                <h2 className="text-lg font-semibold">
                  {elem.name || (elem.eventId && elem.eventId.name) || ""}
                </h2>
                <p>{elem.createdAt}</p>
                {elem.eventId && elem.eventId.photo && (
                  <img
                    className="w-full max-h-48 object-cover rounded-md"
                    src={elem.eventId.photo}
                    alt=""
                  />
                )}
                {elem && elem.photo && (
                  <img
                    className="w-full max-h-48 object-cover rounded-md"
                    src={elem.photo}
                    alt=""
                  />
                )}
                <button
                  onClick={() => handleDelete(elem._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
                {select === "place" ||
                select === "events" ||
                select === "comment" ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleEdit(elem._id)}
                  >
                    Edit
                  </button>
                ) : null}
                {formTrigger && select === "place" && (
                  <form
                    onSubmit={(event) => handleSubmit(elem._id, event)}
                    className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md"
                  >
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="description" className="block mb-1">
                        Description
                      </label>
                      <input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </form>
                )}

                {formTrigger && select === "events" && (
                  <form
                    onSubmit={(event) => handleSubmit(elem._id, event)}
                    className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md"
                  >
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="description" className="block mb-1">
                        Description
                      </label>
                      <input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </form>
                )}
                {/* 
                {formTrigger && select === "events" && (
                  <form
                    onSubmit={(event) => handleSubmit(elem._id, event)}
                    action=""
                  >
                    <div>
                      <label htmlFor="">Name</label>
                      <input onChange={handleChange} type="text" />
                    </div>
                  </form>
                )} */}
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
