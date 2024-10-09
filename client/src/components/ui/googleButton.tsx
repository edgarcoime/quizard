"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSigninButton() {
  const router = useRouter();

  function handleGoogleSignin() {
    window.location.href = '/api/py/auth/login/google?redirect_to='+'/id/johndoe'
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
