import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { authActions } from "../store/slice";
import AddModal from "../components/AddModal";

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

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
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
  }, [todoList]);

  function logoutHandler() {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
  }

  function openModalHandler() {
    setIsOpenModal(!isOpenModal);
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
                <button>수정</button>
                <button>삭제</button>
              </div>
            ))}
          {todoList &&
            todoList.map((item) => (
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
      {isOpenModal && (
        <AddModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      )}
    </>
  );
}
