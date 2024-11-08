"use client";

import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSigninButton() {
  const router = useRouter();

  function handleGoogleSignin() {
    // Redirect back to signup
    // Then middleware will reroute to correct page
    window.location.href = `${API_BASE_URL}/auth/login/google?redirect_to=/signup`;
  }

  return (
    <Button
      size="lg"
      variant="outline"
      className="flex gap-5"
      onClick={handleGoogleSignin}
    >
      <FcGoogle size={30} />
      <p>Login with Google</p>
    </Button>
  );
}
