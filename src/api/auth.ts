import { AuthFormInput, AuthResponse } from "../types/auth";
import { authApi } from "./axiosInstance";

const signUp = async ({
  email,
  password,
}: AuthFormInput): Promise<AuthResponse> => {
  const { data } = await getUserToken("/users/create", { email, password });
  return data;
};

const login = async ({
  email,
  password,
}: AuthFormInput): Promise<AuthResponse> => {
  const { data } = await getUserToken("/users/login", { email, password });
  return data;
};

export { signUp, login };

const getUserToken = (url: string, { email, password }: AuthFormInput) => {
  return authApi.post(url, {
    email,
    password,
  });
};
