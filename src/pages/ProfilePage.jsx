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
    return <p>loading</p>;
  }
  return (
    <div>
      <div>Userpage</div>
      <p className="bg-blue">{userDetail.name}</p>
      <img src={userDetail.avatar} alt="" />
    </div>
  );
}

export default ProfilePage;
