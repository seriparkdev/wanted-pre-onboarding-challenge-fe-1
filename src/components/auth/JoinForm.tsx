import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";

const JoinForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActiveJoinBtn, setIsActiveJoinBtn] = useState(false);
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const emailCondition = email.includes("@") && email.includes(".");
  const passwordCondition = password.length >= 8;

  const joinHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp({ email, password }).then((res) => {
        if (res.data.token) {
          navigate("/login");
        }
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data.details);
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    emailCondition && passwordCondition
      ? setIsActiveJoinBtn(true)
      : setIsActiveJoinBtn(false);
  }),
    [email],
    [password];

  useEffect(() => {
    password.length >= 8
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
    <form onSubmit={joinHandler} className="flex flex-col w-80 m-auto">
      <input
        type="text"
        placeholder="이메일을 입력해주세요"
        id="email"
        className="text-center rounded p-3 mb-3 outline-[#7986cb]"
        onChange={getEmailHandler}
        required
      />
      {!isActiveJoinBtn && <div className="text-[#e45f5a]">{emailAlert}</div>}
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        id="password"
        className="text-center rounded p-3 my-3 outline-[#7986cb] block"
        onChange={getPasswordHandler}
        required
      />
      {!isActiveJoinBtn && (
        <div className="text-[#e45f5a]">{passwordAlert}</div>
      )}
      <button
        type="submit"
        disabled={!isActiveJoinBtn}
        className={
          isActiveJoinBtn
            ? "mt-6 text-white rounded p-4 bg-[#7986cb] font-semibold"
            : "mt-6 bg-[#c5cae9] text-white rounded p-4 font-semibold"
        }
      >
        가입하기
      </button>
    </form>
  );
};

export default JoinForm;
