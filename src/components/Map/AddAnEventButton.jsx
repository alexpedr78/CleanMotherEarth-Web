import React from "react";
import { useNavigate } from "react-router";
function AddAnEventButton({ markerId }) {
  const nav = useNavigate();
  async function handleAddAnEvent() {
    nav(`/getaplace/${markerId}`);
  }
  return (
    <button onClick={handleAddAnEvent}>Add An event about this place</button>
  );
}

export default AddAnEventButton;
