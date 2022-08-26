import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";
import { AuthFormInput, AuthResponse } from "../../types/auth";

const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate, status } = useMutation<AuthResponse, Error, AuthFormInput>(
    signUp,
    {
      onSuccess: () => {
        navigate("/login");
      },
      onError: () => {
        alert("회원가입에 실패했습니다.");
      },
    }
  );
  return { mutate, status };
};

export default useSignUp;
