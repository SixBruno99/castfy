import axios from "axios";

// console.log("url", import.meta.env.VITE_BACKEND_BASE_URL);

export const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

axios.interceptors.request.use(
  function (request) {
    const token = localStorage.getItem("@auth:token");
    if (!token) return request;

    request.headers["Authorization"] = `Bearer ${token}`;

    return request;
  },

  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
