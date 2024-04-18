import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

Api.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return request;
  }
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default Api;
