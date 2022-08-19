import { todoApi } from "./axiosInstance";

const getTodos = () => {
  const response = todoApi.get("/todos");
  return response;
};

const getTodoById = (id: string) => {
  const response = todoApi.get(`/todos/${id}`);
  return response;
};

const createTodo = (title: string, content: string) => {
  const response = todoApi.post("/todos", {
    title,
    content,
  });
  return response;
};

const updateTodo = (newTitle: string, newContent: string, id: string) => {
  const response = todoApi.put(`/todos/${id}`, {
    title: newTitle,
    content: newContent,
  });
  return response;
};

const deleteTodo = (id: string) => {
  const response = todoApi.delete(`/todos/${id}`);
  return response;
};

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
