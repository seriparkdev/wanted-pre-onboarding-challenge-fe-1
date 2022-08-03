import React, { useState } from "react";
import { createTodo } from "../apis";

export default function AddTodo() {
  const userToken = localStorage.getItem("token");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function createTodoHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      createTodo(title, content, `Bearer ${userToken}`);
      setTitle(""), setContent("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={createTodoHandler}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할일을 입력해주세요"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="상세 내용을 입력해주세요"
          required
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}
