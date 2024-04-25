import { useEffect, useState } from "react";
import Api from "../../service/myApi";
import SortByDate from "./SortByDate";
import SortByStartingDate from "../SortByStartingDate/SortByStartingDate.js/SortByStartingDate.jsx";
function SelectProfilepage({ setSelect, select }) {
  const [dataActivity, setDataActivity] = useState(null);
  const [update, setUpdate] = useState(false);
  const [shoComing, setShoComing] = useState(false);
  const [update2, setUpdate2] = useState(false);
  const [formTrigger, setFormTrigger] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
  });
  const [peopleComing, setPeopleComing] = useState({});
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
  }, [select, update, update2]);

  async function handleSelectChange(e) {
    setSelect(e.target.value);
  }
  async function handleEdit() {
    setFormTrigger(!formTrigger);
  }
  function handleChange(e) {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        file: e.target.files[0], // Update file property
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  }

  async function handleSubmit(id, event) {
    event.preventDefault();

    try {
      let response;
      if (select === "place") {
        const formDataWithFile = new FormData();
        if (name) formDataWithFile.append("name", formData.name);
        formDataWithFile.append("description", formData.description);
        formDataWithFile.append("file", formData.file);

        response = await Api.put(`/garbagesPlaces/${id}`, formDataWithFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else if (select === "events") {
        const formDataWithFile = new FormData();
        if (name) formDataWithFile.append("name", formData.name);
        if (description)
          formDataWithFile.append("description", formData.description);
        if (file.length) formDataWithFile.append("file", formData.file);

        response = await Api.put(`/events/${id}`, formDataWithFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setUpdate((prevState) => !prevState);
      setFormTrigger(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function handlePeopleComing(eventId) {
    setShoComing((prevState) => !prevState);
    try {
      let response = await Api.get(`/joining/${eventId}`);

      setPeopleComing((prevState) => ({
        ...prevState,
        [eventId]: response.data,
      }));
      setUpdate2((prevState) => !prevState);
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
      setUpdate((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  }
  async function setThisPlaceToClean(id) {
    try {
      let response = await Api.put(`/garbagesPlaces/${id}`, {
        cleaned: "true",
      });
    } catch (error) {
      console.log(error);
    }
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
    <div className="flex flex-col items-center justify-center h-full">
      <div className="p-4 md:p-8">
        <select
          className="mt-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          name=""
          id=""
          onChange={handleSelectChange}
          value={select}
        >
          <option className="bg-blue-500  rounded-md" value="-1">
            Check Your Activity
          </option>
          <option value="event">See all the Events You Joined</option>
          <option value="events">See all the Events You Created</option>
          <option value="place">
            See all the Place To Clean that You Discovered
          </option>
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <div>
              {dataActivity && Array.isArray(dataActivity) ? (
                <SortByDate
                  setDataActivity={setDataActivity}
                  dataActivity={dataActivity}
                />
              ) : null}
            </div>
            <div>
              {dataActivity &&
              Array.isArray(dataActivity) &&
              select === "event" ? (
                <SortByStartingDate
                  filter={select}
                  setDataActivity={setDataActivity}
                  dataActivity={dataActivity}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <div>
            {dataActivity && Array.isArray(dataActivity) && select !== "-1" ? (
              dataActivity.map((elem, index) => (
                <div
                  key={index}
                  className="bg-white p-4 shadow rounded-md mb-2"
                >
                  <h2 className="text-lg font-semibold">
                    {`Title : ${elem.name}` ||
                      `Title : ${elem.eventId && elem.eventId.name}` ||
                      ""}
                  </h2>
                  <p>
                    {elem.timeStart
                      ? `Starting time:${formatDate(elem.timeStart)}`
                      : null}
                  </p>
                  <p>
                    {elem && elem.eventId && elem.eventId.timeStart
                      ? `Starting time:${formatDate(elem.eventId.timeStart)}`
                      : null}
                  </p>
                  <p>
                    Found the :{" "}
                    {elem.createdAt ? formatDate(elem.createdAt) : null}
                  </p>
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
                  {select === "place" || select === "events" ? (
                    elem && elem.description ? (
                      `Description : ${elem.description}`
                    ) : (
                      <p>no description</p>
                    )
                  ) : null}
                  {select === "place" ? (
                    elem && elem.cleaned ? (
                      <p>Place Cleaned{elem.cleaned}</p>
                    ) : (
                      <p>This Place is not Cleaned Up</p>
                    )
                  ) : null}
                  {select === "place" && elem && elem.cleaned === "false" ? (
                    elem ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                          setThisPlaceToClean(elem._id);
                        }}
                      >
                        Set this place to Cleaned
                      </button>
                    ) : (
                      <p>This Place is not Cleaned Up</p>
                    )
                  ) : null}
                  <div>
                    {select === "events" && !shoComing ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handlePeopleComing(elem._id)}
                      >
                        See People coming to your Events
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handlePeopleComing(elem._id)}
                      >
                        Hide People coming to your Events
                      </button>
                    )}
                    {shoComing ? (
                      <div>
                        <p>People coming to this Event:</p>
                        {peopleComing[elem._id] ? (
                          peopleComing[elem._id].map((person, index) => (
                            <p key={index}>{person.creator.name}</p>
                          ))
                        ) : (
                          <p>No Attendees</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(elem._id)}
                      className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                    {select === "place" || select === "events" ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleEdit(elem._id)}
                      >
                        Edit your Item
                      </button>
                    ) : null}
                  </div>
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
                      <div className="mb-4">
                        <label htmlFor="description" className="block mb-1">
                          Description
                        </label>
                        <input
                          id="file"
                          onChange={handleChange}
                          type="file"
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
                      <div className="mb-4">
                        <label htmlFor="description" className="block mb-1">
                          Description
                        </label>
                        <input
                          id="file"
                          onChange={handleChange}
                          type="file"
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
                </div>
              ))
            ) : (
              <div className="text-gray-500">
                {" "}
                <p>No activity data available for now... </p>
                <p>Pick a filter... </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectProfilepage;
