import React from "react";
import { Link } from "react-router-dom";
import JoinForm from "../components/auth/JoinForm";

const Join = () => {
  return (
    <>
      <header className="pt-20 text-center text-4xl font-black pb-4">
        <Link to="/">
          <span className="text-4xl mr-3 text-[#3f51b5]">✔</span>
          <span className="text-4xl">TODO LIST APP</span>
        </Link>
        <div className="text-lg text-[#999999] pt-2">환영합니다</div>
      </header>
      <JoinForm />
    </>
  );
};

export default Join;
