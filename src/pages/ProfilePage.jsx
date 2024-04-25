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
    <div className="p-4 md:p-8 bg-blue-50 min-h-screen">
      {!updateForm ? (
        <div className="max-w-screen-sm mx-auto">
          <div className="bg-blue-300 p-4 shadow rounded-md">
            <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
                Welcome back {userDetail.pseudo}
              </h1>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                Your ID Card
              </h2>
              <p className="text-lg md:text-xl font-semibold mb-4">
                From the CleanMotherEarth Community
              </p>
              <div>
                <div>
                  <img
                    src={userDetail.avatar}
                    alt="Avatar"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 md:mb-0"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-sm md:text-base font-semibold">
                      <p>Your Name:</p>
                      <p>{userDetail.name}</p>
                    </div>
                    <div className="text-sm md:text-base font-semibold">
                      <p>Your Pseudo:</p>
                      <p>{userDetail.pseudo}</p>
                    </div>
                    <div className="text-sm md:text-base font-semibold">
                      <p>Your Email:</p>
                      <p>{userDetail.email || "N/A"}</p>
                    </div>
                  </div>

                  {userDetail && userDetail.role === "admin" && (
                    <button
                      onClick={handleDashboard}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    >
                      Go to the Dashboard
                    </button>
                  )}
                  <SelectProfilepage select={select} setSelect={setSelect} />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setUpdateForm(!updateForm)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              >
                Update your profile
              </button>
              <button
                onClick={handleDelete}
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Are you sure you want to delete your account?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
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
