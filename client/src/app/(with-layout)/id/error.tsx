'use client';

import React from 'react';

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.log('logging error:', error);
  }, [error]);

  return (

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-red-600 p-4">Error: User not found!</h2>
        <div>

        </div>
      </div>

  );
}