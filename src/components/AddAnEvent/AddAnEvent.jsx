import React, { useState } from "react";

function AddAnEvent() {
  const [addEventForm, setAddEventForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: { long: "", lat: "" },
    photo: "",
    description: "",
  });
  async function handleSubmit() {}
  async function handleInputChange() {}
  const handleToggleForm = () => {
    setAddEventForm(!addEventForm);
  };
  async function handleCancel() {
    setAddEventForm(!addEventForm);
  }

  return (
    <div>
      {!addEventForm ? (
        <button onClick={handleToggleForm}>
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
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Photo
            </label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter photo URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter description"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Place
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
