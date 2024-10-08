"use client";

import { IoArrowBack } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function NavBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Goes back 1 step in the path
  function backHandler() {
    // Split the current path by '/'
    const pathSegments = pathname.split("/").filter(Boolean); // filter(Boolean) removes any empty segments

    // If there is more than one segment, remove the last part and navigate
    if (pathSegments.length > 1) {
      const newPath = "/" + pathSegments.slice(0, -1).join("/");
      router.push(newPath);
    }
    // If only one segment (like "/id"), just navigate back using the router.back()
    else {
      router.back();
    }
  }

  return (
    <Button variant="link" size="icon" className="m-2" onClick={backHandler}>
      <IoArrowBack size={30} />
    </Button>
  );
}
