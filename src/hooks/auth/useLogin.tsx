import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/slice";
import { login } from "../../api/auth";
import { AuthFormInput, AuthResponse } from "../../types/auth";
import Storage from "../../utils/Storage";
import { useDispatch } from "react-redux";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation<AuthResponse, Error, AuthFormInput>(login, {
    onSuccess: (response) => {
      Storage.set("token", response.token);
      dispatch(authActions.login());
      navigate("/");
    },
    onError: () => {
      alert("로그인에 실패했습니다.");
    },
  });
  return { mutate, status };
};

export default useLogin;
