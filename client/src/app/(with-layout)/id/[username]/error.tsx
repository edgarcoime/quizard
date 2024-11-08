"use client";

import React from "react";

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.log("logging error:", error);
  }, [error]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-red-600">
        Error: something went wrong
      </h2>
      <p className="text-md text-red-400">{error?.message}</p>
    </div>
  );
}
