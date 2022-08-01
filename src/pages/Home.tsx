import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link to="/login">
        <button>로그인</button>
      </Link>
      <Link to="/join">
        <button>회원가입</button>
      </Link>
    </>
  );
}
