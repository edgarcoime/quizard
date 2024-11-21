"use client";

import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants";
import { useRouter, useParams } from "next/navigation";

export default function DeleteCollectionButton() {
  const router = useRouter();
  const params = useParams<{ username: string; collection: string }>();

  async function handleClick() {
    console.log("Delete collection", params.collection);
    const url = `${API_BASE_URL}/collection/${params.collection}`;

    const res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    console.log("Delete collection response", res);

    if (!res.ok) {
      console.error("Failed to delete collection", res.status, res.statusText);
      return;
    }

    router.push(`/id/${params.username}`);
  }

  return (
    <Button
      type="submit"
      variant="destructive"
      className="w-full text-lg h-12"
      onClick={handleClick}
    >
      Delete Collection
    </Button>
  );
}
