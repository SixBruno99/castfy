import axios from "axios";

console.log("url", import.meta.env.VITE_BACKEND_BASE_URL);

export const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

http.interceptors.request.use(
  function (request) {
    const sessionToken = sessionStorage.getItem("@auth:token");
    const localToken = localStorage.getItem("@auth:token");

    if (sessionToken) {
      request.headers["Authorization"] = `Bearer ${sessionToken}`;
      return request;
    }

    if (localToken) {
      request.headers["Authorization"] = `Bearer ${localToken}`;
    }

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
