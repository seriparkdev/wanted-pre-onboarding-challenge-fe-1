import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getTodoById } from "../../api/todo";
import useGetTodos from "../../hooks/todo/useGetTodos";
import useDeleteTodo from "../../hooks/todo/useDeleteTodo";
import useUpdateTodo from "../../hooks/todo/useUpdateTodo";
import TodoDetail from "./TodoDetail";

const TodoList = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 모든 todo 가져오기
  const { todos } = useGetTodos();

  // todo 삭제하기
  const { mutate: deleteTodoWith } = useDeleteTodo();

  const deleteTodoBtnHandler = (id: string) => {
    deleteTodoWith(id);
  };

  // todo 수정하기
  const { mutate: updateTodoWith } = useUpdateTodo();

  const updateTodoHandler = (id: string) => {
    setIsEditMode(!isEditMode);
    updateTodoWith({ title, content, id });
  };

  const switchToEditMode = (id: string) => {
    setIsEditMode(true);
    getTodoId(id);
  };

  const getTodoId = (id: string) => {
    getTodoById(id).then((res) => {
      setTodoId(res.data.data.id);
    });
  };

  const editModeHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const getNewTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const getNewContentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <div>
      {todos &&
        todos.map((todo) => (
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
                      onClick={() => switchToEditMode(todo.id)}
                      className="mr-2 bg-[#e8eaf6] px-1 rounded"
                    >
                      수정
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteTodoBtnHandler(todo.id)}
                      className="bg-[#e8eaf6] px-1 rounded"
                    >
                      삭제
                    </button>
                  </span>
                  <TodoDetail todo={todo} />
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default TodoList;
