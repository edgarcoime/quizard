import { API_BASE_URL } from "@/constants/api";
import { headers } from "next/headers";

// example of server side fetching
// - Since this fetch originate from the nextjs server, header needs to be transported so backend can identify the user
export async function fetchUserData() {
  try {
    const res = await fetch(`${API_BASE_URL}/user/me`);

    const data = await res.json();
    return data;
  } catch (error) {
    // If error means something wrong with permissions
    console.log(error);
    return null;
  }
}
