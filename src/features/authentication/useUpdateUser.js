import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updatedUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updatedUserApi,
    onSuccess: (data) => {
      toast.success("User data successfully updated");
      queryClient.invalidateQueries(["user"]);
      console.log("data : ", data);
    },
    onError: () => toast.error("There was an error while updating the data"),
  });

  return { updateUser, isUpdating };
}
