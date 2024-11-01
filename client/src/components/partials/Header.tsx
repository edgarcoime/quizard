"use client";

import NavBackButton from "./NavBackButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="bg-gray-200">
      <div className="bg-gray-500 h-full max-w-screen-xl mx-auto shadow-lg">
        {/* <NavBackButton /> */}
        <MobileMenu/>
      </div>
    </header>
  );
}
