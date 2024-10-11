"use client";

import SettingsButton from "../ui/settingsButton";
import { usePathname } from "next/navigation";
import useUserData from "../hooks/useUserData";

// Loading component
function Fallback() {
  return <div className="flex justify-end p-4">loading...</div>;
}

// Error component
function ErrorView() {
  return <p>There was an error fetching permissions.</p>;
}

// WARN: Don't add async as it will error out
export default function UserCollectionCardSettings({
  description,
}: {
  description: string;
}) {
  const { data, isLoading, isError } = useUserData();

  if (isLoading) return <Fallback />;
  if (isError) return <ErrorView />;

  const currentPath = usePathname();
  const settingsRoute = `${currentPath}/settings`;

  return (
    <div className="flex justify-end p-4">
      {/* User Settings for authorized */}
      {!!data && (
        <SettingsButton desc={description} routeRedirect={settingsRoute} />
      )}
    </div>
  );
}
