import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }), // thanks to loginApi we might get a data that return from async func
    onSuccess: (user) => {
      //user: {user, session} //we need only user.user.
      console.log(user);
      queryClient.setQueryData(["user"], user.user); //owing to this feature user.user will be accessable in useUser.js queryKey: ["user"], so we don't need fetch again. and there'll no spinner
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
