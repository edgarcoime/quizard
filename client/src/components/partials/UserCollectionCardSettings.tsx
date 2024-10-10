"use client";

import SettingsButton from "../ui/settingsButton";
import { useRouter, usePathname } from "next/navigation";

export function Fallback() {
  return <div className="flex justify-end p-4">loading...</div>;
}

export default function UserCollectionCardSettings() {
  const username = "johndoe";
  const data = {};

  const router = useRouter();
  const currentPath = usePathname();

  const settingsRoute = `${currentPath}/settings`;

  return (
    <div className="flex justify-end p-4">
      <SettingsButton desc="User Settings" routeRedirect={settingsRoute} />
    </div>
  );
}
