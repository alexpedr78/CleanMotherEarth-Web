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
    if (
      !formData.name ||
      !formData.description ||
      !clickedPosition.lat ||
      !clickedPosition.long
    ) {
      alert("Please fill in all fields and select a location on the map.");
      return;
    }
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
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setShowForm(true)}
          >
            Help us find new places
          </button>
          <p className="mt-2 text-black font-bold   border py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Select a location by clicking on the map Check the Markers to Create
            an Event
          </p>
        </div>
      ) : (
        <div className="">
          <form onSubmit={handleSubmit} className="mt-4 border shadow">
            <p className="mt-2 text-black font-bold   border py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Select a location by clicking on the map{" "}
              {clickedPosition.lat && clickedPosition.long ? (
                <img src="./verified.png" alt="" />
              ) : null}
            </p>

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
            <div className="flex flex-col">
              <button
                type="submit"
                className="mb-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Place
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormPlaceAppPage;
