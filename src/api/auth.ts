import { authFormInput } from "../types/auth";
import { authApi } from "./axiosInstance";

const signUp = ({ email, password }: authFormInput) => {
  return getUserToken("/user/create", { email, password });
};

const login = ({ email, password }: authFormInput) => {
  return getUserToken("/users/login", { email, password });
};

export { signUp, login };

const getUserToken = (url: string, { email, password }: authFormInput) => {
  return authApi.post(url, {
    email,
    password,
  });
};
