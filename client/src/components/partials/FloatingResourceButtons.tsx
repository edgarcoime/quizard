"use server";

import CreateResourceButton from "../ui/createResourceButton";
import { headers, cookies } from "next/headers";

export default async function FloatingResourceButtons({
  children,
  createUrl,
  ownerPrivilegeValidator,
}: Readonly<{
  children: React.ReactNode;
  createUrl: string;
  // INFO: Function has to have server prileges not client
  ownerPrivilegeValidator: () => Promise<boolean>;
}>) {
  const cookieStore = cookies();
  const cookieName = "session";
  const cookieSession = cookieStore.get(cookieName);

  const ownerPrivileges = cookieSession && (await ownerPrivilegeValidator());
  return (
    <div className="h-full static flex flex-col">
      {/* main content */}
      <div className="flex-grow">{children}</div>

      <div className="sticky bottom-6 flex justify-end px-4">
        {ownerPrivileges && <CreateResourceButton href={createUrl} />}
      </div>
    </div>
  );
}
