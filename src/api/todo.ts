import { todoApi } from "./axiosInstance";
import { NewTodo, Todo, TodoId } from "../types/todo";

const getTodos = async (): Promise<Todo[]> => {
  const response = await todoApi.get("/todos");
  return response.data.data;
};

const getTodoById = (id: string) => {
  const response = todoApi.get(`/todos/${id}`);
  return response;
};

const createTodo = async ({ title, content }: NewTodo): Promise<Todo> => {
  const response: Todo = await todoApi.post("/todos", {
    title,
    content,
  });
  return response;
};

const updateTodo = async ({
  title,
  content,
  id,
}: NewTodo & TodoId): Promise<Todo> => {
  const response: Todo = await todoApi.put(`/todos/${id}`, {
    title,
    content,
  });
  return response;
};

const deleteTodo = (id: string) => {
  const response = todoApi.delete(`/todos/${id}`);
  return response;
};

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
