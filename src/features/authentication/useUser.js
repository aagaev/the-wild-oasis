import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"], // we get get here user.user. See useLogin.js
    queryFn: getCurrentUser,
  });

  console.log(user);

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
