import { authFormInput } from "../types/auth";
import { authApi } from "./axiosInstance";

const signUp = ({ email, password }: authFormInput) => {
  const response = authApi.post("/users/create", {
    email,
    password,
  });
  return response;
};

const login = ({ email, password }: authFormInput) => {
  const response = authApi.post("/users/login", {
    email,
    password,
  });
  return response;
};

export { signUp, login };
