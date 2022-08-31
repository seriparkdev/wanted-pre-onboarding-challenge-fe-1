import axios from "axios";
import Storage from "../utils/Storage";

const userToken = Storage.get("token");

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
