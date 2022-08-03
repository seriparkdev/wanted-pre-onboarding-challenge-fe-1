import React from "react";
import { Link } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
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
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [todoId, setTodoId] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
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

  function updateHandler(id: string) {
    setIsEdit(!isEdit);
    getTodoById(id);
  }

  function editModeHandler() {
    setIsEdit(!isEdit);
  }

  function getTodoById(id: string) {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTodoId(res.data.data.id);
      });
  }

  function updateTodo(id: string) {
    setIsEdit(!isEdit);
    const token = localStorage.getItem("token");
    axios.put(
      `http://localhost:8080/todos/${id}`,
      {
        title: newTitle,
        content: newContent,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
                {isEdit && item.id === todoId ? (
                  <div>
                    <textarea
                      defaultValue={item.title}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                    <textarea
                      defaultValue={item.content}
                      onChange={(e) => setNewContent(e.target.value)}
                      required
                    />
                    <button onClick={editModeHandler}>수정 취소</button>
                    <button onClick={() => updateTodo(item.id)}>완료</button>
                  </div>
                ) : (
                  <div>
                    <div>{item.title}</div>
                    <Link to={`/${item.id}`}>
                      <button type="button">상세</button>
                    </Link>

                    <button
                      type="button"
                      onClick={() => updateHandler(item.id)}
                    >
                      수정
                    </button>
                <Routes>
                  <Route
                    path={`/${item.id}`}
                    element={
                      <>
                        <div>{item.content}</div>
                        <div>{item.createdAt}</div>
                        <div>{item.updatedAt}</div>
                      </>
                    }
                  />
                </Routes>
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
