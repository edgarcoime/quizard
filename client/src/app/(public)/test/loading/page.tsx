export default async function Page() {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await fetch("https://fakestoreapi.com/products/3");
  const product = await res.json();

  return (
    <div>
      <h1>Product page</h1>
      <p>demo a loading splash </p>

      <div>{JSON.stringify(product)}</div>
    </div>
  );
}
