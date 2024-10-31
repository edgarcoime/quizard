"use client";

import { usePathname } from "next/navigation";
import NavBackButton from "./NavBackButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoEllipsisHorizontal } from "react-icons/io5";

export default function Header() {
  const pathname = usePathname();
  const isHome = /^\/id\/(?!settings$|new$)[^\/]+$/.test(pathname)
  const isCollections = /^\/id\/(?!settings$|new$)[^\/]+\/(?!settings$|new$)[^\/]+$/.test(pathname)
  const isCreateCollection = /^\/id\/(?!settings$|new$)[^\/]+\/new$/.test(pathname)
  const isCard = /^\/id\/(?!settings$|new$)[^\/]+\/(?!settings$|new$)[^\/]+\/(?!settings$|new$)[^\/]+$/.test(pathname)
  const isProfile = /^\/id\/(?!settings$|new$)[^\/]+\/settings$/.test(pathname)
  const title = isProfile ? "Profile" : isCreateCollection ? "New Collection" : isCard ? "Card" : isCollections ? "Collection" : "Quizard"

  return (
    <header className="bg-gray-200 sticky top-0 left-0 right-0">
      <div className="bg-gray-500 h-12 max-w-screen-xl flex flex-row justify-between items-center px-5">
        <div className="flex flex-row items-center justify-between gap-5">
          {!isHome && <NavBackButton />}
          <h1 className="font-bold text-lg">
            {title}
          </h1>
        </div>
        <div>
          {
            isCollections && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <IoEllipsisHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Collection</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <span>Edit title</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }
        </div>
      </div>
    </header>
  );
}
