import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { authActions } from "../store/slice";

export default function Home() {
  interface Todo {
    content: string;
    createdAt: string;
    id: string;
    title: string;
    updatedAt: string;
  }
  const dispatch = useDispatch();
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const auth = useSelector((state: RootState) => state.auth.auth);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:8080/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setTodoList(res.data.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  function logoutHandler() {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
  }

  return (
    <>
      {auth ? (
        <div>
          <button onClick={logoutHandler}>로그아웃</button>
          <div>TODO</div>
          <button onClick={openModalHandler}>생성</button>

          {todoList &&
            todoList.map((item) => (
              <div key={item.id}>
                <div>{item.title}</div>
              </div>
            ))}
          {todoList.map((item) => (
            <div key={item.id}>
              <div>{item.title}</div>
              <div>{item.content}</div>
              <div>{item.createdAt}</div>
              <div>{item.updatedAt}</div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Link to="/login">
            <button>로그인</button>
          </Link>
          <Link to="/join">
            <button>회원가입</button>
          </Link>
        </>
      )}
    </>
  );
}
