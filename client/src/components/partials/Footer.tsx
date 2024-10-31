"use client"

import { fetchUserData } from "@/lib/api/userData";
import { headers } from "next/headers";
import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function Footer({ userName }: { userName: string }) {
  const pathname = usePathname();
  const isCollections = /^\/id\/(?!settings$|new$)[^\/]+\/(?!settings$|new$)[^\/]+$/.test(pathname)

  return (
    <footer className="w-full sticky bottom-0 right-0 left-0 overflow-hidden">
      <div className="bg-gray-500 flex flex-row h-full justify-around items-center p-2 mt-1">
        <Link href={`/id/${userName}`} className="flex flex-col items-center hover:text-gray-300">
          <IoIosHome style={{ fontSize: '22px' }} />
          <span className="text-sm">
            Home
          </span>
        </Link>
        <Link href={`/id/${userName}/new`} className="flex flex-col items-center hover:text-gray-300">
          <MdAddBox style={{ fontSize: '22px' }} />
          <span className="text-sm">
            New Collection
          </span>
        </Link>
        <Link href={`/id/${userName}/settings`} className="flex flex-col items-center hover:text-gray-300">
          <FaCircleUser style={{ fontSize: '22px' }} />
          <span className="text-sm">
            Profile
          </span>
        </Link>
      </div>
      {
        isCollections && (
          <Link
            className="fixed bottom-16 right-2 rounded-full w-10 h-10 z-50 bg-white border border-black flex justify-center items-center"
            href={`${pathname}/new`}
          >
            <IoAdd className="h-6 w-6" />
          </Link>
        )
      }
    </footer>
  );
}
