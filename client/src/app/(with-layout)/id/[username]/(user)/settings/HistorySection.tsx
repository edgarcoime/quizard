"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchSampleHistory } from "@/lib/api/testData";

// Create a new Hook
function useHistoryData() {
  const opts = useQuery<string>({
    queryFn: async () => await fetchSampleHistory(),
    queryKey: ["user", "history"],
  });

  return {
    ...opts,
  };
}

// Create Error View
function ErrorView() {
  return <p>There was an error fetching history.</p>;
}

// Create loader
function LoadingView() {
  return (
    <div className="h-32 flex flex-col justify-center bg-gray-200">
      <h2 className="uppercase text-center text-2xl">loading</h2>
    </div>
  );
}

export default function HistorySection() {
  const { data, isLoading, isError } = useHistoryData();

  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;

  return (
    <CardContent>
      <p className="text-gray-600">
        Your previous answers to flashcards will appear here.
      </p>
    </CardContent>
  );
}
