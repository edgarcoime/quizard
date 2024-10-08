"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function SettingsButton({
  desc,
  routeRedirect,
}: {
  desc: string;
  routeRedirect: string;
}) {
  const router = useRouter();

  function pushHandler() {
    router.push(routeRedirect);
  }

  return (
    <Button className="bg-slate-300" variant="outline" onClick={pushHandler}>
      {desc}
    </Button>
  );
}
