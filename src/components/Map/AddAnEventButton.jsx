import { useNavigate } from "react-router";
function AddAnEventButton({ markerId }) {
  const nav = useNavigate();
  async function handleAddAnEvent() {
    nav(`/getaplace/${markerId}`);
  }
  return (
    <button
      className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
      onClick={handleAddAnEvent}
    >
      Add An event about this place
    </button>
  );
}

export default AddAnEventButton;
