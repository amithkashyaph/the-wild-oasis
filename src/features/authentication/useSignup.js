import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account created successfully. Please verify the new account from user's email address"
      );
      navigate("/");
    },
    onError: () => toast.error("Unable to create user"),
  });

  return { signup, isSigningUp };
}
