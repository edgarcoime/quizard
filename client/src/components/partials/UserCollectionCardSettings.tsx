"use client";

import { fetchUserData } from "@/lib/api/userData";
import SettingsButton from "../ui/settingsButton";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// Custom hook to fetch data
async function getUserData() {
  const data = await fetchUserData();
  return data;
}

// Loading component
function Fallback() {
  return <div className="flex justify-end p-4">loading...</div>;
}

// Error component
function ErrorView() {
  return <p>There was an error fetching permissions.</p>;
}

// WARN: Don't add async as it will error out
export default function UserCollectionCardSettings() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getUserData(),
    queryKey: ["user"],
  });

  if (isLoading) return <Fallback />;
  if (isError) return <ErrorView />;

  const username = data.username;
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
