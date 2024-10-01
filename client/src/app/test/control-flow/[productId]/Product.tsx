import { Product as ProdType } from "../product";

export default async function Product({ productId }: { productId: string }) {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const product: ProdType = await res.json();

  return (
    <section>
      <p>Title: {product.title}</p>
      <p>Description: {product.description}</p>
    </section>
  );
}
