"use server";

import { headers, cookies } from "next/headers";
import FloatingResourceButton, {
  ButtonNode,
} from "../ui/floatingResourceButton";

export default async function FloatingResourceButtons({
  children,
  buttons,
  ownerPrivilegeValidator,
}: Readonly<{
  children: React.ReactNode;
  buttons: ButtonNode[];
  // INFO: Function has to have server prileges not client
  ownerPrivilegeValidator: () => Promise<boolean>;
}>) {
  const cookieStore = cookies();
  const cookieName = "session";
  const cookieSession = cookieStore.get(cookieName);

  const ownerPrivileges = cookieSession && (await ownerPrivilegeValidator());

  function calculateJustify() {
    switch (buttons.length) {
      case 0:
        return "justify-center";
      case 1:
        return "justify-end";
      default:
        return "justify-between";
    }
  }
  return (
    <div className="h-full static flex flex-col">
      {/* main content */}
      <div className="flex-grow">{children}</div>

      {ownerPrivileges && (
        <div className={`sticky bottom-6 flex ${calculateJustify()} px-4`}>
          {buttons.map((node, idx) => (
            <FloatingResourceButton key={idx} node={node} />
          ))}
        </div>
      )}
    </div>
  );
}
