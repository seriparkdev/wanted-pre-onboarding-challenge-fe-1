import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "../../api/todo";
import { Todo, NewTodo } from "../../types/todo";

const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation<Todo, Error, NewTodo>(createTodo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["todos"]);
    },
  });
  return { mutate, status };
};

export default useCreateTodo;
