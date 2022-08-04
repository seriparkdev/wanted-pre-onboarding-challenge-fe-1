import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../apis";
import { Link } from "react-router-dom";

export default function Join() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  async function joinHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signUp(email, pwd).then((res) => {
        if (res.data.token) {
          navigate("/login");
        }
      });
    } catch (error: any) {
      alert(error.response.data.details);
    }
  }

  function joinEmailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function joinPwdHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPwd(e.target.value);
  }

  return (
    <>
      <header className="pt-20 text-center text-4xl font-black pb-4">
        <Link to="/">
          <span className="text-4xl mr-3 text-[#3f51b5]">✔</span>
          <span className="text-4xl">TODO LIST APP</span>
        </Link>
        <div className="text-lg text-[#999999] pt-2">환영합니다</div>
      </header>

      <form onSubmit={joinHandler} className="flex flex-col w-80 m-auto">
        <input
          type="text"
          placeholder="이메일을 입력해주세요"
          id="email"
          className="text-center rounded mb-5 p-3 outline-[#7986cb]"
          onChange={joinEmailHandler}
          required
        />
        <input
          type="text"
          placeholder="비밀번호를 입력해주세요"
          id="password"
          className="text-center rounded p-3 outline-[#7986cb] block"
          onChange={joinPwdHandler}
          required
        />
        <button
          type="submit"
          className="mt-6 bg-[#c5cae9] text-white rounded p-4 hover:bg-[#7986cb] font-semibold"
        >
          가입하기
        </button>
      </form>
    </>
  );
}
