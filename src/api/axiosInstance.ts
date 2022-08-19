import axios from "axios";

const userToken = localStorage.getItem("token");

const authApi = axios.create({
  baseURL: "http://localhost:8080",
});

const todoApi = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export { authApi, todoApi };
