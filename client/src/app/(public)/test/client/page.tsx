"use client";
// Example of a client side rendered page

import { API_BASE_URL, SERVER_VISIBLE_ONLY } from "@/constants";

export default function Page() {
  const dataVisibility = {
    server: SERVER_VISIBLE_ONLY,
    client: API_BASE_URL,
  };

  async function submitHandler() {
    console.log("submitHandler: inside");
    console.log(API_BASE_URL);
  }

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page. It is a good place to test things.</p>
      <p>{JSON.stringify(dataVisibility)}</p>
      <form action={submitHandler} className="bg-gray-500">
        <button type="submit">SUBMIT CLIENT</button>
      </form>
    </div>
  );
}
