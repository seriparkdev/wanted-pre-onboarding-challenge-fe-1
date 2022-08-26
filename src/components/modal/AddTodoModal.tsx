import React, { useState } from "react";
import useCreateTodo from "../../hooks/todo/useCreateTodo";

const AddTodoModal = ({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate: addNewTodo } = useCreateTodo();

  const resetState = () => {
    setTitle(""), setContent(""), setIsOpenModal(!isOpenModal);
  };

  const addTodoBtnHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewTodo({ title, content });
    resetState();
  };

  const inputTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const inputContentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const modalOpenHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className="fixed bg-black opacity-60 top-0 left-0 w-full h-full"></div>
      <form
        onSubmit={addTodoBtnHandler}
        className="flex flex-col fixed top-2/4 left-1/2 translate-x-[-50%] translate-y-[-50%] w-5/12 rounded px-10 py-14 bg-white"
      >
        <div className="text-center mb-4 text-lg">TODO 추가</div>
        <input
          type="text"
          value={title}
          onChange={inputTitleHandler}
          placeholder="할일을 입력해주세요"
          className="p-3 mb-3 rounded border-2 border-[#999999] outline-[#7986cb] w-full"
          required
        />
        <input
          type="text"
          value={content}
          onChange={inputContentHandler}
          placeholder="상세 내용을 입력해주세요"
          className="border-2 border-[#999999] p-3 rounded outline-[#7986cb] w-full"
          required
        />
        <button
          type="submit"
          className="bg-[#7986cb] mt-5 p-2 rounded text-white"
        >
          등록
        </button>
        <button
          type="submit"
          className="bg-[#7986cb] mt-2 p-2 rounded text-white"
          onClick={modalOpenHandler}
        >
          닫기
        </button>
      </form>
    </>
  );
};

export default AddTodoModal;
