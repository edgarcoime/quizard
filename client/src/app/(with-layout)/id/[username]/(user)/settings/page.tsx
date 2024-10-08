"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiEdit } from "react-icons/fi";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("John Doe");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-4">User Settings Page</h1>
      <Card className="p-6 max-w-md mx-auto bg-gray-50 shadow-md">
        <CardContent className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="w-full mb-4 flex items-center justify-center space-x-2">
            {isEditing ? (
              <Input
                value={displayName}
                onChange={handleInputChange}
                className="w-1/2"
                placeholder="Enter your display name"
              />
            ) : (
              <span className="text-lg">{displayName}</span>
            )}
            <Button variant="ghost" size="icon" onClick={handleEditClick}>
              <FiEdit />
            </Button>
          </div>

          <Button className="w-full">Save Changes</Button>
        </CardContent>

        {/* History Section Placeholder */}
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Your previous answers to flashcards will appear here.</p>
        </CardContent>
      </Card>
    </>
  );
}
