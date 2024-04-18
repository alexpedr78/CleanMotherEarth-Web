import React from "react";
import { useEffect } from "react";
import axios from "axios";

function Userpage() {
  async function getUserInfo() {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return <div>Userpage</div>;
}

export default Userpage;
