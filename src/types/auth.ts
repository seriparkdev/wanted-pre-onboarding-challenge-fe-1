export interface AuthFormInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  messgae: string;
  token: string;
}

export interface AuthFormType {
  formType: "회원가입" | "로그인";
}
