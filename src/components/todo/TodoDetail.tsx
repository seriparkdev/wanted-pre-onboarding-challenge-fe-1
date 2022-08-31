import React from "react";
import { Route, Routes } from "react-router-dom";
import { Todo } from "../../types/todo";

const TodoDetail = ({ todo }: { todo: Todo }) => {
  return (
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
  );
};
export default TodoDetail;
