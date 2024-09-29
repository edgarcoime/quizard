"use client";
import { useRouter } from "next/navigation";
// This is a component on the browser

import { Product } from "./product";

interface ProductTileProps {
  product: Product;
}

export default function ProductTile({ product }: ProductTileProps) {
  const router = useRouter();
  const { id, title } = product;

  const clickHandler = () => {
    router.push(`/test/control-flow/${id}`);
  };

  return (
    <li
      onClick={() => {
        clickHandler();
      }}
    >
      <p>{title}</p>
    </li>
  );
}
