import React from "react";
import AuthForm from "../components/auth/AuthForm";

const Login = () => {
  return (
    <>
      <header className="pt-20 text-center font-black pb-4">
        <span className="text-4xl mr-3 text-[#3f51b5]">✔</span>
        <span className="text-4xl">TODO LIST APP</span>
        <div className="text-xl text-[#999999] pt-2">로그인</div>
      </header>
      <AuthForm formType="로그인" />
    </>
  );
};

export default Login;
