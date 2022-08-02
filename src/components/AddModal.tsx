import React, { useState } from "react";
import { Dispatch } from "react";
import axios from "axios";

export default function AddModal({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function titleHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTitle(e.target.value);
  }

  function contentHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  async function createTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios
        .post(
          "http://localhost:8080/todos",
          {
            title: title,
            content: content,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          setTitle(""), setContent("");
          setIsOpenModal(!isOpenModal);
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div>TODO 추가</div>
      <form onSubmit={createTodo}>
        <div>제목</div>
        <textarea onChange={titleHandler} />
        <div>내용</div>
        <textarea onChange={contentHandler} />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
