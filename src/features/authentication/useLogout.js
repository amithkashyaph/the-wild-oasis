import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading: isLoggingout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      toast.success("Successfully logged out");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: (error) => toast.error(error.message),
  });

  return { logout, isLoggingout };
}
