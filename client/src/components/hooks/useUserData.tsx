import { fetchUserData } from "@/lib/api/userData";
import { UserData } from "@/types/UserData";
import { useQuery } from "@tanstack/react-query";

export default function useUserData() {
  const opts = useQuery<UserData>({
    //queryFn: async () => await getData(),
    queryFn: async () =>
      await fetchUserData({
        credentials: "include",
      }),
    queryKey: ["user"],
  });

  // TODO: Add hook/function to check validity of permissions

  return {
    ...opts,
  };
}
