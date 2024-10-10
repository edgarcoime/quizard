"use client";

import { fetchUserData } from "@/lib/api/userData";
import SettingsButton from "../ui/settingsButton";
import { useRouter, usePathname } from "next/navigation";

export function Fallback() {
  return <div className="flex justify-end p-4">loading...</div>;
}

// WARN: Don't add async as it will error out
export default async function UserCollectionCardSettings() {
  const username = "johndoe";
  const data = {};
  //const data = await fetchUserData();

  const router = useRouter();
  const currentPath = usePathname();

  const settingsRoute = `${currentPath}/settings`;

  return (
    <div className="flex justify-end p-4">
      {JSON.stringify(data, null, 2)}
      {/* Public */}

      {/* User Settings for authorized */}
      <SettingsButton desc="User Settings" routeRedirect={settingsRoute} />
    </div>
  );
}
