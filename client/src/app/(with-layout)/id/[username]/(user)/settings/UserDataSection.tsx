"use client";

import useUserData from "@/components/hooks/useUserData";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/constants/api";
import { generateRandomUsername } from "@/lib/api/generateRandomUsername";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

function ErrorView() {
  return <div>Error loading user data.</div>;
}

function LoadingView() {
  return (
    <div className="h-72 flex flex-col justify-center bg-gray-200">
      <h2 className="uppercase text-center text-2xl">loading</h2>
    </div>
  );
}

export default function UserDataSection() {
  const { data, isLoading, isError } = useUserData();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const currentPath = usePathname();

  // Set username when data is fetched
  useEffect(() => {
    if (!isLoading && !isError && data?.username) {
      setUsername(data.username);
      console.log(generateRandomUsername());
    }
  }, [data, isLoading, isError]);

  // Redirect to the correct URL if needed
  useEffect(() => {
    const truePath = `/id/${data?.username}/settings`;
    if (data?.username && currentPath !== truePath) {
      router.push(truePath);
    }
  }, [data?.username, currentPath, router]);

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(`${API_BASE_URL}/user/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          name,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedData = await res.json();
      setUsername(updatedData.username);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <CardContent className="flex flex-col items-center">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="w-full mb-4 flex items-center justify-center space-x-2">
        <span className="text-lg">Name: {data?.name}</span>
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
          <span className="text-lg">Username: {username}</span>
        )}
        <Button variant="ghost" size="icon" onClick={handleEditClick}>
          <FiEdit />
        </Button>
      </div>

      {isEditing && (
        <Button className="w-full" onClick={handleSaveClick}>
          Save Changes
        </Button>
      )}
    </CardContent>
  );
}
