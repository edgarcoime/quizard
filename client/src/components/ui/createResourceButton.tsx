"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateResourceButton({ href }: { href: string }) {
  const router = useRouter();

  function handleClick() {
    router.push(href);
  }

  return (
    <Button
      size="icon"
      variant="outline"
      className="rounded-full w-16 h-16"
      aria-label="Add item"
      onClick={handleClick}
    >
      <Plus className="h-4 w-4" />
    </Button>
  );
}
