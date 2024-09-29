// Example of a server side rendered page
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms

import { API_BASE_URL, SERVER_VISIBLE_ONLY } from "@/constants";
import { getTestPosts } from "@/lib/api/testPost";
import { notFound } from "next/navigation";
import CreateTestPostForm from "./CreateTestPostForm";

export default async function Page() {
  const dataVisibility = {
    server: SERVER_VISIBLE_ONLY,
    client: API_BASE_URL,
  };

  async function submitHandler() {
    "use server";

    console.log("submitHandler: inside");
    console.log(API_BASE_URL);
  }

  let posts = await getTestPosts();
  if (!posts) {
    notFound();
  }

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page. It is a good place to test things.</p>
      <div>
        <p>{JSON.stringify(dataVisibility)}</p>
        <form action={submitHandler} className="bg-gray-500">
          <button type="submit">SUBMIT CLIENT</button>
        </form>
      </div>

      <h1>Demonstration of Mutating Data</h1>
      <CreateTestPostForm />

      <h1>Demonstration of Fetching Data</h1>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
