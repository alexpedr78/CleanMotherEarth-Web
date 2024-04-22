import { useEffect, useState } from "react";
import Api from "../service/myApi";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import UpdateProfilButton from "../components/UpdateProfilButton/UpdateProfilButton.jsx";
import SelectProfilepage from "../components/SelectProfilepage/SelectProfilepage.jsx";

function ProfilePage() {
  const { logout } = useAuth();
  const [userDetail, setUserDetail] = useState(null);
  const [select, setSelect] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);
  const [reloadInfos, setReloadInfos] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for managing the visibility of the delete modal
  const nav = useNavigate();

  async function getUserInfo() {
    try {
      const response = await Api.get(`/users`);
      setUserDetail(response.data);
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [reloadInfos]);

  async function handleDelete() {
    setShowDeleteModal(true); // Show the delete confirmation modal
  }

  async function confirmDelete() {
    try {
      await Api.delete("/users", userDetail._id);
      logout();
      nav("/"); // Redirect to the home page after logout
    } catch (error) {
      console.log(error);
    }
  }

  if (!userDetail) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!updateForm ? (
        <div className="flex flex-col md:flex-row">
          <div className="bg-white p-4 w-screen ">
            <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                Welcome back {userDetail.pseudo}
              </h1>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:mr-4">
                  <img
                    src={userDetail.avatar}
                    alt="Avatar"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 md:mb-0"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    Your Name: {userDetail.name}
                  </p>
                  <p className="text-lg font-semibold">
                    Your Pseudo: {userDetail.pseudo}
                  </p>
                  <p className="text-lg font-semibold">
                    Your Email: {userDetail.email || "N/A"}
                  </p>
                  <SelectProfilepage select={select} setSelect={setSelect} />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setUpdateForm(!updateForm)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update your profile
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete Your Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <UpdateProfilButton
          reloadInfos={reloadInfos}
          setReloadInfos={setReloadInfos}
          getUserInfo={getUserInfo}
          setUpdateForm={setUpdateForm}
          updateForm={updateForm}
          userDetail={userDetail}
        />
      )}

      {/* Modal for confirming account deletion */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Are you sure you want to delete your account?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
