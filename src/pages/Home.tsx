import React, { useState } from "react";
import AddTodoModal from "../components/todo/AddTodoModal";
import Storage from "../utils/Storage";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slice";
import TodoList from "../components/todo/TodoList";

const Home = () => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    Storage.remove("token");
  };

  const modalOpenHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
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
          <TodoList />
        </section>
      </main>

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
