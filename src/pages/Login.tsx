import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slice";
import { login } from "../apis";
import { Link } from "react-router-dom";

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
      await login(email, pwd).then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          dispatch(authActions.login());
          navigate("/");
        }
      });
    } catch (error: any) {
      alert(error.response.data.details);
    }
  }
  return (
    <>
      <header className="pt-20 text-center font-black pb-4">
        <Link to="/">
          <span className="text-4xl mr-3 text-[#3f51b5]">✔</span>
          <span className="text-4xl">TODO LIST APP</span>
        </Link>
        <div className="text-xl text-[#999999] pt-2">login</div>
      </header>

      <form onSubmit={loginHandler} className="flex flex-col m-auto w-80">
        <input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요"
          onChange={LoginEmailHandler}
          className="text-center rounded mb-5 p-3 outline-[#7986cb]"
          required
        />
        <input
          type="text"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={LoginPwdHandler}
          className="text-center rounded p-3 outline-[#7986cb]"
          required
        />
        <button
          type="submit"
          className="mt-6 bg-[#c5cae9] text-white rounded p-4 hover:bg-[#7986cb] font-semibold"
        >
          로그인
        </button>
      </form>
    </>
  );
}
