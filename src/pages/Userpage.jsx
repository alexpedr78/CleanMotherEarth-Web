import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Api from "./../service/myApi";
function Userpage() {
  async function getUserInfo() {
    try {
      let response = await Api.get(`/users`);
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
