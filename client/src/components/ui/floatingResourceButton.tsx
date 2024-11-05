"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonNode {
  href: string;
  symbol: React.ReactNode;
}

export default function FloatingResourceButton({ node }: { node: ButtonNode }) {
  const { href, symbol } = node;
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
      {symbol}
    </Button>
  );
}
