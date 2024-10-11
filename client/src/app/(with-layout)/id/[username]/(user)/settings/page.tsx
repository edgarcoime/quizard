"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserDataSection from "./UserDataSection";

export default async function Page() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">
        User Settings Page
      </h1>
      <Card className="p-6 max-w-md mx-auto bg-gray-50 shadow-md">
        {/* User Data Section */}
        <UserDataSection />
        {/* History Section Placeholder */}
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Your previous answers to flashcards will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
