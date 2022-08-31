import React from "react";
import AuthForm from "../components/auth/AuthForm";

const Join = () => {
  return (
    <>
      <header className="pt-20 text-center text-4xl font-black pb-4">
        <span className="text-4xl mr-3 text-[#3f51b5]">✔</span>
        <span className="text-4xl">TODO LIST APP</span>
        <div className="text-lg text-[#999999] pt-2">회원가입</div>
      </header>
      <AuthForm formType="회원가입" />
    </>
  );
};

export default Join;
