import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <header className="pt-20 text-center font-black pb-4">
        <Link to="/">
          <span className="text-4xl mr-3 text-[#3f51b5]">✔</span>
          <span className="text-4xl">TODO LIST APP</span>
        </Link>
        <div className="text-xl text-[#999999] pt-2">login</div>
      </header>
      <LoginForm />
    </>
  );
};

export default Login;
