
import fetchCard from "@/lib/api/cardInfo";
import { CardInfo } from "@/types/cardInfo";
import { collectionCard } from "@/types/CollectionCard";
import { UserData } from "@/types/UserData";
import { useQuery } from "@tanstack/react-query";

async function fetchCardData(id: string) {
  const res = await fetch(`/api/py/card/${id}`);
  if (!res.ok) throw new Error("Error fetching card data");
  return res.json();
}

export default function useCardData(id:string) {
  const opts = useQuery<CardInfo>({
    //queryFn: async () => await getData(),
    queryFn: async () => await fetchCardData(id),
    queryKey: ["card", id],
  });

  // TODO: Add hook/function to check validity of permissions

  return {
    ...opts,
  };
}
