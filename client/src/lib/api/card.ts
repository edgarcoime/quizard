import { API_BASE_URL } from "@/constants";
import { notFound } from "next/navigation";
import { UserCollection as Collection } from "@/types/UserCollection";
import { collectionCard as Card } from "@/types/CollectionCard";

import "server-only";
import { headers } from "next/headers";

export async function getAllByCollection(
  collectionSlug: string,
  opts?: RequestInit,
): Promise<Card[]> {
  const url = `${API_BASE_URL}/collection/${collectionSlug}/cards`;
  const res = await fetch(url, opts ?? {});

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(
      `Failed to get cards for that collection (${collectionSlug}). Please try again later.`,
    );
  }

  const cards = (await res.json()) as Card[];

  if (!cards) {
    notFound();
  }

  return cards;
}

export async function getSingle(
  cardId: string,
  opts?: RequestInit,
): Promise<Card> {
  const url = `${API_BASE_URL}/card/${cardId}`;
  const res = await fetch(url, opts ?? {});

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(
      `Failed to get that card (${cardId}). Please try again later.`,
    );
  }

  const card = (await res.json()) as Card;

  if (!card) {
    notFound();
  }

  return card;
}
