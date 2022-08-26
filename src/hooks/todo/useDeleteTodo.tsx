import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "../../api/todo";

const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation(deleteTodo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["todos"]);
    },
  });
  return { mutate, status };
};

export default useDeleteTodo;
