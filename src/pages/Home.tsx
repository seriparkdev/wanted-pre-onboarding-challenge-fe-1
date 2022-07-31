import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div>TODO LIST</div>
      <div>Login</div>
      <input type="text" placeholder="이메일" />
      <input type="text" placeholder="비밀번호" />
      <Link to="/join">
        <button>회원가입</button>
      </Link>
    </>
  );
}
