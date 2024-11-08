"use client";

import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants";
import { useRouter, useParams } from "next/navigation";

export default function DeleteCardButton() {
  const router = useRouter();
  const { username, collection, card } = useParams<{
    username: string;
    collection: string;
    card: string;
  }>();

  async function handleClick() {
    console.log("Delete card", collection, card);
    const url = `${API_BASE_URL}/card/${card}`;
    const res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });

    console.log("Delete collection response", res);

    if (!res.ok) {
      console.error("Failed to delete card", res.status, res.statusText);
      return;
    }

    router.push(`/id/${username}/${collection}`);
  }

  return (
    <Button type="submit" variant="destructive" onClick={handleClick}>
      Delete Card
    </Button>
  );
}
