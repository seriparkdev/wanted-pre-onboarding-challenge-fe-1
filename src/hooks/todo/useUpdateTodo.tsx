import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "../../api/todo";
import { NewTodo, Todo, TodoId } from "../../types/todo";

const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation<Todo, Error, NewTodo & TodoId>(
    updateTodo,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["todos"]);
      },
    }
  );
  return { mutate, status };
};

export default useUpdateTodo;
