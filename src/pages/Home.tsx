import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { authActions } from "../store/slice";
import { getTodos, getTodoById, updateTodo, deleteTodo } from "../apis";
import AddTodo from "../components/AddTodo";

export default function Home() {
  interface Todo {
    content: string;
    createdAt: string;
    id: string;
    title: string;
    updatedAt: string;
  }

  const dispatch = useDispatch();
  const userToken = localStorage.getItem("token");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [todoId, setTodoId] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const auth = useSelector((state: RootState) => state.auth.auth);

  useEffect(() => {
    try {
      getTodos(`Bearer ${userToken}`).then((res) => {
        setTodoList(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [todoList]);

  function getTodoIdHandler(id: string) {
    getTodoById(id, `Bearer ${userToken}`).then((res) => {
      setTodoId(res.data.data.id);
    });
  }

  function updateTodoHandler(id: string) {
    setIsEdit(!isEdit);
    updateTodo(newTitle, newContent, id, `Bearer ${userToken}`);
  }

  function deleteTodoHandler(id: string) {
    deleteTodo(id, `Bearer ${userToken}`);
    confirm("정말 삭제하시겠습니까?");
  }

  function logoutHandler() {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
  }

  function updateHandler(id: string) {
    setIsEdit(!isEdit);
    getTodoIdHandler(id);
  }

  function editModeHandler() {
    setIsEdit(!isEdit);
  }

  return (
    <>
      {auth ? (
        <div>
          <button onClick={logoutHandler}>로그아웃</button>
          <div>TODO</div>

          <AddTodo />

          {todoList.map((item) => (
            <div key={item.id}>
              {isEdit && item.id === todoId ? (
                <div>
                  <input
                    type="text"
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
                  <button onClick={() => updateTodoHandler(item.id)}>
                    완료
                  </button>
                </div>
              ) : (
                <div>
                  <div>{item.title}</div>
                  <Link to={`/${item.id}`}>
                    <button type="button">상세</button>
                  </Link>

                  <button type="button" onClick={() => updateHandler(item.id)}>
                    수정
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTodoHandler(item.id)}
                  >
                    삭제
                  </button>
                </div>
              )}

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
    </>
  );
}
