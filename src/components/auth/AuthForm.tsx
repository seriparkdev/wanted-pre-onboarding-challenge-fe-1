import React, { useEffect, useState } from "react";
import { AuthFormType } from "../../types/auth";
import useSignUp from "../../hooks/auth/useSignUp";
import useLogin from "../../hooks/auth/useLogin";
import { Link } from "react-router-dom";

const AuthForm = ({ formType }: AuthFormType) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActiveSubmitBtn, setIsActiveSubmitBtn] = useState(false);
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const emailCondition = email.includes("@") && email.includes(".");
  const passwordCondition = password.length >= 8;

  const { mutate: userSignUp } = useSignUp();
  const { mutate: userLogin } = useLogin();

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailCondition && passwordCondition && formType === "회원가입") {
      userSignUp({ email, password });
    } else if (emailCondition && passwordCondition && formType === "로그인") {
      userLogin({ email, password });
    }
  };

  useEffect(() => {
    emailCondition && passwordCondition
      ? setIsActiveSubmitBtn(true)
      : setIsActiveSubmitBtn(false);
  }),
    [email],
    [password];

  useEffect(() => {
    passwordCondition
      ? setPasswordAlert("")
      : setPasswordAlert("비밀번호는 8자리 이상으로 입력해주세요");
  }),
    [email];

  useEffect(() => {
    emailCondition ? setEmailAlert("") : setEmailAlert("@, .을 포함해주세요");
  }),
    [password];

  const getEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const getPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col w-80 m-auto">
      <input
        type="text"
        placeholder="이메일을 입력해주세요"
        id="email"
        className="text-center rounded p-3 mb-3 outline-[#7986cb]"
        onChange={getEmailHandler}
        required
      />
      {!isActiveSubmitBtn && <div className="text-[#e45f5a]">{emailAlert}</div>}
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        id="password"
        className="text-center rounded p-3 my-3 outline-[#7986cb] block"
        onChange={getPasswordHandler}
        required
      />
      {!isActiveSubmitBtn && (
        <div className="text-[#e45f5a]">{passwordAlert}</div>
      )}
      <button
        type="submit"
        disabled={!isActiveSubmitBtn}
        className={
          isActiveSubmitBtn
            ? "mt-6 text-white rounded p-4 bg-[#7986cb] font-semibold"
            : "mt-6 bg-[#c5cae9] text-white rounded p-4 font-semibold"
        }
      >
        {formType}
      </button>
      {formType === "로그인" && (
        <>
          <Link to="/join" className="text-[#7986cb] mt-3 text-right">
            회원가입
          </Link>
        </>
      )}
    </form>
  );
};

export default AuthForm;
