import React, { useState } from "react";
import Api from "../../service/myApi";
import Map from "../Map/Map";
function FormPlaceAppPage({ setShowForm, showForm, clickedPosition }) {
  const [formData, setFormData] = useState({
    name: "",
    position: { long: "", lat: "" },
    photo: "",
    description: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);

    try {
      formData.position = {
        long: clickedPosition.long,
        lat: clickedPosition.lat,
      };
      let response = await Api.post("/garbagesPlaces", formData); // Pass formData to the API
      if (response) {
        console.log("Form submitted:", formData);
      }

      setFormData({
        name: "",
        position: { long: "", lat: "" },
        photo: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div>
      {!showForm ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowForm(true)}
        >
          Help us find new places
        </button>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="mt-4">
            <p>Select a location by clicking on the map</p>
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
                type="file"
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
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormPlaceAppPage;
