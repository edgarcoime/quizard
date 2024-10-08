"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Page({}) {
  const loggedIn = false;
  const username = "johndoe";

  // Check if there is user logged in
  // if not, redirect to login page
  if (!loggedIn) {
    return redirect("/signup");
  } else {
    return redirect(`/id/${username}`);
  }
}
