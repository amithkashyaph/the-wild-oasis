import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: () => {
      toast.success("Successfully logged in");
      navigate("/dashboard");
    },
    onError: () =>
      toast.error(
        "Error while trying to login. Please check email and password"
      ),
  });

  return { login, isLoggingIn };
}
