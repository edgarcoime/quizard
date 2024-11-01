"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import useUserData from "../hooks/useUserData";
import { API_BASE_URL } from "@/constants/api";

export default function Navbar() {
  const [state, setState] = React.useState(false);
  const { data } = useUserData(); // Checks if the user is logged in
  const router = useRouter();

  const menus = [
    { title: "Collections", path: `/id/${data?.username}` },
    { title: "Profile", path: `/id/${data?.username}/settings` },
    { title: "Settings", path: "/settings" },
  ];

  const handleLogout = async () => {
    setState(false);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        router.push("/");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white w-full border-b md:border-0">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        {/* Logo Section */}
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href={data ? `/id/${data.username}` : "/"}>
            <h1 className="text-3xl font-bold text-black-500">Quizard</h1>
          </Link>
          {/* Hamburger menu, only shown if user is logged in */}
          {data && (
            <div className="md:hidden">
              <button
                className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setState(!state)}
              >
                <Menu />
              </button>
            </div>
          )}
        </div>

        {/* Conditionally Render Menu Links and Logout Button if User is Logged In */}
        {data && (
          <>
            {/* Menu Links */}
            <div
              className={`flex-1 justify-center items-center pb-3 mt-8 md:flex md:pb-0 md:mt-0 ${
                state ? "block" : "hidden"
              }`}
            >
              <ul className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
                {menus.map((item, idx) => (
                  <li key={idx} className="text-gray-600 hover:text-indigo-600 text-center md:text-left">
                    <Link href={item.path} onClick={() => setState(false)}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logout Button */}
            <div className={`md:block ${state ? "block" : "hidden"} md:ml-auto md:pr-4 py-4`}>
              <button
                onClick={handleLogout}
                className="text-white bg-gray-800 hover:bg-gray-700 hover:text-red-600 md:mt-0 mt-4 p-2 rounded-md w-full md:w-auto"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
