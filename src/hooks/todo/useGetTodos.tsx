import { useQuery } from "react-query";
import { getTodos } from "../../api/todo";
import { Todo } from "../../types/todo";

const useGetTodos = () => {
  const { data, status } = useQuery<Todo[]>(["todos"], getTodos);
  const todos = data;
  return { todos, status };
};

export default useGetTodos;
