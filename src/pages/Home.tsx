import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { authActions } from "../store/slice";

export default function Home() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.auth);
  function logoutHandler() {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
  }

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
