import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slice";
import { login } from "../../api/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActiveLogin, setIsActiveLogin] = useState(false);

  const inputEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const inputPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password }).then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          dispatch(authActions.login());
          navigate("/");
        }
      });
    } catch (error: any) {
      alert(error.response.data.details);
    }
  };

  useEffect(() => {
    email.includes("@") && email.includes(".") && password.length >= 8
      ? setIsActiveLogin(true)
      : setIsActiveLogin(false);
  }),
    [email],
    [password];

  return (
    <form onSubmit={loginHandler} className="flex flex-col m-auto w-80">
      <input
        type="text"
        name="email"
        placeholder="이메일을 입력해주세요"
        onChange={inputEmailHandler}
        className="text-center rounded mb-5 p-3 outline-[#7986cb]"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={inputPasswordHandler}
        className="text-center rounded p-3 outline-[#7986cb]"
        required
      />
      <button
        type="submit"
        disabled={!isActiveLogin}
        className={
          isActiveLogin
            ? "mt-6 text-white rounded p-4 bg-[#7986cb] font-semibold"
            : "mt-6 bg-[#c5cae9] text-white rounded p-4 font-semibold"
        }
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
