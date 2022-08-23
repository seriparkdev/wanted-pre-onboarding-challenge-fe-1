import React from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/slice";
import { login } from "../../api/auth";
import Storage from "../../utils/Storage";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActiveLogin, setIsActiveLogin] = useState(false);
  const emailCondition = email.includes("@") && email.includes(".");
  const passwordCondition = password.length >= 8;

  const getEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const getPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ email, password }).then((res) => {
        if (res.data.token) {
          Storage.set("token", res.data.token);
          dispatch(authActions.login());
          navigate("/");
        }
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data.details);
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    emailCondition && passwordCondition
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
        onChange={getEmailHandler}
        className="text-center rounded mb-5 p-3 outline-[#7986cb]"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={getPasswordHandler}
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
