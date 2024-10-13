import { useEffect, useState } from "react";
import Api from "../service/myApi";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import UpdateProfilButton from "../components/UpdateProfilButton/UpdateProfilButton.jsx";
import SelectProfilepage from "../components/SelectProfilepage/SelectProfilepage.jsx";

function ProfilePage() {
  const { logout } = useAuth();
  const [userDetail, setUserDetail] = useState(null);
  const [select, setSelect] = useState("-1");
  const [updateForm, setUpdateForm] = useState(false);
  const [reloadInfos, setReloadInfos] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, [reloadInfos]);

  async function getUserInfo() {
    try {
      const response = await Api.get(`/users`);
      setUserDetail(response.data);
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  }

  async function handleDelete() {
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    try {
      await Api.delete("/users", userDetail._id);
      logout();
      nav("/");
    } catch (error) {
      console.log(error);
    }
  }

  if (!userDetail) {
    return <p>Loading...</p>;
  }

  function handleDashboard() {
    nav("/dashboard");
  }

  return (
    <div className="p-4 md:p-8 bg-blue-50 min-h-screen mb-12">
      {!updateForm ? (
        <div className="max-w-screen-md mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  Your ID Card
                </h2>
                <p className="text-sm md:text-base font-medium">
                  From the CleanMotherEarth Community
                </p>
                <div className="flex flex-col items-center mb-6">
              <img
                src={userDetail.avatar}
                alt="Avatar"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                {userDetail.pseudo}
              </h1>
              <p className="text-lg md:text-xl font-semibold text-gray-700">
                {userDetail.name}
              </p>
              <p className="text-base md:text-lg text-gray-600">
                {userDetail.email || "No email provided"}
              </p>
              
            {userDetail.role === "admin" && (
              <div className="flex justify-center mb-4 mt-4">
                <button
                  onClick={handleDashboard}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Go to Dashboard
                </button>
              </div>
            )}
            </div>

              </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
           
                        </div>
                        <div className="bg-blue-300 text-blue-900 p-4 rounded-lg">
                <SelectProfilepage select={select} setSelect={setSelect} />
              </div>


            <div className="flex justify-center mt-4">
              <button
                onClick={() => setUpdateForm(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Update Profile
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete Account
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

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg md:text-xl text-gray-800 mb-4">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
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
    </div>
  );
}

export default ProfilePage;
