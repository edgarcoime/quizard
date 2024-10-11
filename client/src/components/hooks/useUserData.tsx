import { fetchUserData } from "@/lib/api/userData";
import { UserData } from "@/types/UserData";
import { useQuery } from "@tanstack/react-query";

async function getData() {
  const data = await fetchUserData();
  return data;
}

export default function useUserData() {
  const opts = useQuery<UserData>({
    queryFn: async () => await getData(),
    queryKey: ["user"],
  });

  // TODO: Add hook/function to check validity of permissions

  return {
    ...opts,
  };
}
