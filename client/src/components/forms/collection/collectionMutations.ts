import { API_BASE_URL } from "@/constants";
import { CreateCollectionPayload } from "@/types/CreateCollectionPayload";
import { UpdateCollectionPayload } from "@/types/UpdateCollectionPayload";
import { UserCollection } from "@/types/UserCollection";

export async function createCollection(
  payload: CreateCollectionPayload,
): Promise<UserCollection | undefined> {
  const url = `${API_BASE_URL}/collection`;
  const res = await fetch(url, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log(payload);

  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
  }

  const data = (await res.json()) as UserCollection | undefined;
  return data;
}

export async function updateCollection(
  slug: string,
  payload: UpdateCollectionPayload,
): Promise<UserCollection | undefined> {
  const url = `${API_BASE_URL}/collection/${slug}`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log(payload);

  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
  }

  const data = (await res.json()) as UserCollection | undefined;
  return data;
}
