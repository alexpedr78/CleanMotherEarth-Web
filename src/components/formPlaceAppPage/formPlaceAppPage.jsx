import React, { useState } from "react";
import Api from "../../service/myApi";
import Map from "../Map/Map";
import { json } from "react-router";

function FormPlaceAppPage({ setShowForm, showForm, clickedPosition }) {
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: name === "photo" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formDataToSend = {};
    try {
      if (formData.photo) {
        formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("position", JSON.stringify(clickedPosition));
        formDataToSend.append("description", formData.description);
        formDataToSend.append("photo", formData.photo);
      } else {
        if (clickedPosition) {
          formDataToSend.position = clickedPosition;
        }
        if (formData.name) {
          formDataToSend.name = formData.name;
        }
        if (formDataToSend.description) {
          formDataToSend.description = formData.description;
        }
      }
      const response = await Api.post("/garbagesPlaces", formDataToSend);
      setFormData({
        name: "",
        photo: null,
        description: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
