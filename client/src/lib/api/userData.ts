import { API_BASE_URL } from "@/constants/api";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { headers } from "next/headers";

// example of server side fetching
// - Since this fetch originate from the nextjs server, header needs to be transported so backend can identify the user
//
export async function fetchUserData(opts?: RequestInit) {
  try {
    const res = await fetch(`${API_BASE_URL}/user/me`, opts ?? {});

    const data = await res.json();
    return data;
  } catch (error) {
    // If error means something wrong with permissions
    console.log("Error fetching user from cookie", error);
    return null;
  }
}
