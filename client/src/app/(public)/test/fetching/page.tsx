"use client";

import { useState } from "react";

interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Page() {
  const [items, setItems] = useState([{ text: "Learn use optimistic" }]);

  function submitForm(e: any) {
    e.preventDefault();

    const newItemText = e.target.item.value;

    setItems((prevItems) => [...prevItems, { text: newItemText }]);
  }

  return (
    <>
      <h1>My List</h1>
      <form onSubmit={submitForm}>
        <input type="text" name="item" placeholder="Make a video" />
        <button type="submit">add</button>
      </form>

      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item.text}</li>
        ))}
      </ul>
    </>
  );
}
