import { useState } from "react";
import Api from "../../service/myApi";
import { useNavigate } from "react-router";
function AddAnEvent({ placeInfos }) {
  const nav = useNavigate();
  const [addEventForm, setAddEventForm] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    avatar: null,
    description: "",
    timeStart: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormState((prevState) => ({
      ...prevState,
      avatar: file,
    }));
  };

  const handleToggleForm = () => {
    setAddEventForm(!addEventForm);
  };

  const handleCancel = () => {
    setAddEventForm(!addEventForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = {};

      if (formState.avatar) {
        formData = new FormData();
        formData.append("name", formState.name);
        formData.append("position", JSON.stringify(placeInfos.position));
        formData.append("description", formState.description);
        formData.append("timeStart", formState.timeStart);
        formData.append("photo", formState.avatar);
      } else {
        if (placeInfos) {
          formData.position = JSON.stringify(placeInfos.position);
        }
        if (formState.name) {
          formData.name = formState.name;
        }
        if (formState.description) {
          formData.description = formState.description;
        }
        if (formState.timeStart) {
          formData.timeStart = formState.timeStart;
        }
      }
      const response = await Api.post("/events", formData);
      nav("/app");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {!addEventForm ? (
        <button
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
          onClick={handleToggleForm}
        >
          Add an event about this place
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formState.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Date
            </label>
            <input
              type="datetime-local"
              id="timeStart"
              value={formState.timeStart}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Photo
            </label>
            <input
              type="file"
              id="avatar"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formState.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter description"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create an Event
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default AddAnEvent;
