import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { authActions } from "../store/slice";
import { getTodos, getTodoById, updateTodo, deleteTodo } from "../api/todo";
import AddTodoModal from "../components/modal/AddTodoModal";
import { Todo } from "../types/todo";
import Storage from "../utils/Storage";

const Home = () => {
  const dispatch = useDispatch();
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const hasAuth = useSelector((state: RootState) => state.auth.auth);

  useEffect(() => {
    try {
      getTodos().then((res) => {
        setTodoList(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [todoList]);

  const getTodoIdHandler = (id: string) => {
    getTodoById(id).then((res) => {
      setTodoId(res.data.data.id);
    });
  };

  const updateTodoHandler = (id: string) => {
    setIsEditMode(!isEditMode);
    updateTodo(newTitle, newContent, id);
  };

  const deleteTodoHandler = (id: string) => {
    deleteTodo(id);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    Storage.remove("token");
  };

  const updateHandler = (id: string) => {
    setIsEditMode(!isEditMode);
    getTodoIdHandler(id);
  };

  const editModeHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const modalOpenHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  const getNewTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const getNewContentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };

  return (
    <>
      {hasAuth ? (
        <div>
          <header className="bg-[#5c6bc0] p-3 text-center fixed right-0 left-0 top-0 z-50">
            <span className="text-white font-medium">✔ TODO LIST APP</span>
            <button
              onClick={logoutHandler}
              className="text-white text-sm border border-2 rounded p-1 px-2 fixed  right-1.5 top-2"
            >
              로그아웃
            </button>
          </header>
          <main>
            <div className="mt-10 py-7 flex flex-col place-items-center">
              <span className="font-semibold text-xl pb-2">TODO LIST</span>
              <button
                className="bg-[#5c6bc0] rounded-lg w-20 font-normal text-sm text-[#e8eaf6] py-1 px-3.5"
                onClick={modalOpenHandler}
              >
                추가
              </button>
            </div>
            <section className="mt-1">
              {todoList.map((todo) => (
                <div key={todo.id}>
                  {isEditMode && todo.id === todoId ? (
                    <div className="rounded flex flex-col pb-3 bg-white mx-16 break-all p-6 mb-6">
                      <input
                        type="text"
                        defaultValue={todo.title}
                        onChange={getNewTitleHandler}
                        className="rounded px-2 border-2 border-[#7986cb] outline-[#283593]"
                        required
                      />
                      <input
                        type="text"
                        defaultValue={todo.content}
                        onChange={getNewContentHandler}
                        className="rounded px-2 border-2 border-[#7986cb] mt-2 outline-[#283593]"
                        required
                      />
                      <div className="text-right text-white rounded-lg text-sm">
                        <button
                          onClick={editModeHandler}
                          className="my-2 py-1 bg-[#5c6bc0] rounded-lg w-20 mr-2"
                        >
                          수정 취소
                        </button>
                        <button
                          onClick={() => updateTodoHandler(todo.id)}
                          className="bg-[#5c6bc0] rounded-lg w-20 py-1"
                        >
                          완료
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 px-16">
                      <div className="bg-white py-4 rounded relative px-6 pb-4">
                        <span className="font-semibold break-all text-justify">
                          {todo.title}
                        </span>
                        <span className="absolute top-4 right-4">
                          <Link to={`/${todo.id}`}>
                            <button
                              type="button"
                              className="mr-2 bg-[#e8eaf6] px-1 rounded"
                            >
                              상세
                            </button>
                          </Link>
                          <button
                            type="button"
                            onClick={() => updateHandler(todo.id)}
                            className="mr-2 bg-[#e8eaf6] px-1 rounded"
                          >
                            수정
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteTodoHandler(todo.id)}
                            className="bg-[#e8eaf6] px-1 rounded"
                          >
                            삭제
                          </button>
                        </span>
                        <Routes>
                          <Route
                            path={`/${todo.id}`}
                            element={
                              <div className="flex flex-col break-all mt-4">
                                <span>{todo.content}</span>
                                <span className="flex flex-col text-xs text-[#999999] text-right mt-4">
                                  <span>만든 날짜: {todo.createdAt}</span>
                                  <span>수정 날짜: {todo.updatedAt}</span>
                                </span>
                              </div>
                            }
                          />
                        </Routes>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          </main>
        </div>
      ) : (
        <>
          <header className="text-center">
            <div className="pt-32 text-6xl font-black">
              <span className="mr-3 text-[#3f51b5]">✔</span>
              <span>TODO LIST APP</span>
            </div>
            <h3 className="mt-5 mb-16 text-[#999999]">
              당신의 할일을 기록하세요
            </h3>
          </header>
          <main className="text-center flex flex-col place-items-center">
            <Link
              to="/login"
              className="bg-[#7986cb] rounded text-white w-80 mb-5 p-4 font-medium"
            >
              로그인
            </Link>
            <Link
              to="/join"
              className="bg-[#7986cb] rounded text-white w-80 p-4 font-medium"
            >
              회원가입
            </Link>
          </main>
        </>
      )}
      <footer className="text-[#999999] absolute left-[47%] bottom-4">
        @seriparkdev
      </footer>
      {isOpenModal && (
        <AddTodoModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      )}
    </>
  );
};
export default Home;
