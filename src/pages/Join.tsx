import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  async function joinHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/create", {
        email: email,
        password: pwd,
      });

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
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={joinEmailHandler}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="text"
          placeholder="password"
          id="password"
          onChange={joinPwdHandler}
        />
        <button type="submit">가입하기</button>
      </form>
    </>
  );
}
