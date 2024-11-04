import { API_BASE_URL } from "@/constants";
import { notFound } from "next/navigation";
import { UserCollection as Collection } from "@/types/UserCollection";

import "server-only";
import { headers } from "next/headers";

export async function getSingle(slug: string): Promise<Collection> {
  const cookie = headers().get("cookie");
  const url = `${API_BASE_URL}/collection/${slug}`;
  // TODO: change visibility to public
  const res = await fetch(
    url,
    cookie
      ? {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: cookie,
          },
        }
      : {},
  );

  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch collection. Please try again later.");
  }

  const collection = (await res.json()) as Collection;

  if (!collection) {
    // Render the closest `not-found.js` Error Boundary
    notFound();
  }

  return collection;
}