"use client";

import useUserData from "@/components/hooks/useUserData";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateRandomUsername } from "@/lib/api/generateRandomUsername";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

function ErrorView() {
  return <div>Error loading user data.</div>;
}

// Cover Page with loading
function LoadingView() {
  return (
    <div className="h-72 flex flex-col justify-center bg-gray-200">
      <h2 className="uppercase text-center text-2xl">loading</h2>
    </div>
  );
}

export default function UserDataSection() {
  // Async data fetching
  const { data, isLoading, isError } = useUserData();
  // Hooks have to be declared at the top
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isError && data?.username) {
      setUsername(data.username);
      console.log(generateRandomUsername());
    }
  }, [data, isLoading, isError]);

  // Handle Loading state
  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  // Ensure url is correct
  // TODO: might have to be in the router component
  const truePath = `/id/${data?.username}/settings`;
  const currentPath = usePathname();
  if (currentPath !== truePath) {
    router.push(truePath);
  }

  // Have access to data here now
  const { name } = data!;

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <CardContent className="flex flex-col items-center">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="w-full mb-4 flex items-center justify-center space-x-2">
        <span className="text-lg">Name: {name}</span>
      </div>
      <div className="w-full mb-4 flex items-center justify-center space-x-2">
        {isEditing ? (
          <Input
            value={username}
            onChange={handleInputChange}
            className="w-1/2"
            placeholder="Enter your display name"
          />
        ) : (
          <>
            <span className="text-lg">Username: {username}</span>
          </>
        )}
        <Button variant="ghost" size="icon" onClick={handleEditClick}>
          <FiEdit />
        </Button>
      </div>

      <Button className="w-full">Save Changes</Button>
    </CardContent>
  );
}
