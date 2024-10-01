import { Product } from "./product";
import ProductTile from "./ProductTile";

export default async function Page() {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await fetch("https://fakestoreapi.com/products/");
  const products: Product[] = await res.json();

  return (
    <div>
      <h1>Welcome to Products page!</h1>
      <p>demo a loading splash </p>

      <ul>
        {products.map((prod) => (
          <ProductTile key={prod.id} product={prod} />
        ))}
      </ul>
    </div>
  );
}
