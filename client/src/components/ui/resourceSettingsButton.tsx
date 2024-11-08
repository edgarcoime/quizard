"use client";

import { Button } from "@/components/ui/button";
import { Cog } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResourceSettingsButton({ href }: { href: string }) {
  const router = useRouter();

  function handleClick() {
    router.push(href);
  }

  return (
    <Button
      size="icon"
      variant="outline"
      className="rounded-full w-20 h-20 z-50"
      aria-label="Add item"
      onClick={handleClick}
    >
      <Cog className="h-8 w-8" />
    </Button>
  );
}
