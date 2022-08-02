import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  function LoginEmailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function LoginPwdHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPwd(e.target.value);
  }

  async function loginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8080/users/login", {
          email: email,
          password: pwd,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
            dispatch(authActions.login());
            navigate("/");
          }
        });
    } catch (error: any) {
      alert(error.response.data.details);
    }
  }
  return (
    <div>
      <form onSubmit={loginHandler}>
        <div>Login</div>
        <input
          type="text"
          name="email"
          placeholder="이메일"
          onChange={LoginEmailHandler}
          required
        />
        <input
          type="text"
          name="password"
          placeholder="비밀번호"
          onChange={LoginPwdHandler}
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
