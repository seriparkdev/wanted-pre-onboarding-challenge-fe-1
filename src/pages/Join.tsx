import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../apis";

export default function Join() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  async function joinHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signUp(email, pwd);
      navigate("/");
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
      <div>환영합니다</div>
      <form onSubmit={joinHandler}>
        <input
          type="text"
          placeholder="이메일을 입력해주세요"
          id="email"
          onChange={joinEmailHandler}
        />

        <input
          type="text"
          placeholder="비밀번호를 입력해주세요"
          id="password"
          onChange={joinPwdHandler}
        />
        <button type="submit">가입하기</button>
      </form>
    </>
  );
}
