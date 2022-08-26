export interface AuthFormInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  messgae: string;
  token: string;
}
