"use client";

import NavBackButton from "./NavBackButton";

export default function Header() {
  return (
    <header className="bg-gray-200">
      <div className="bg-gray-500 h-full max-w-screen-xl mx-auto shadow-lg">
        <NavBackButton />
      </div>
    </header>
  );
}
