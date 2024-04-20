import { useEffect } from "react";
import Api from "../service/myApi";
import { useState } from "react";

function ProfilePage() {
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await Api.get(`/users`);
        setUserDetail(response.data);
      } catch (error) {
        console.log("Error fetching user info:", error);
      }
    }
    getUserInfo();
  }, []);

  if (!userDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar (if any) */}
      <div className="md:w-1/4 bg-gray-100 p-4">
        {/* Sidebar content here */}
      </div>

      {/* Main content area */}
      <div className=" bg-white p-4">
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
            </div>
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Change Profile Info
            </button>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Delete Your Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
