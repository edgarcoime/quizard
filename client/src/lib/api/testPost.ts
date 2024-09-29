// Resource/Data for this route
export interface TestPost {
  id: string;
  title: string;
  body: string;
  userId: number;
}

// Params for Functions
export interface CreateTestPostParams {
  title: string;
  body: string;
  userId: number;
}

export async function getTestPosts(): Promise<TestPost[] | null> {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    let posts: TestPost[] = await res.json();
    return posts;
    // return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function createTestPost({
  userId,
  title,
  body,
}: CreateTestPostParams): Promise<TestPost | null> {
  "use server";
  try {
    // Validate manually or through library
    const payload = {
      userId,
      title,
      body,
    };

    // Send Payload
    let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Parse server return
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
