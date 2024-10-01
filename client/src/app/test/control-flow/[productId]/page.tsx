import LoadingProduct from "./LoadingProduct";
import Product from "./Product";
import { Suspense } from "react";

export default function Page({ params }: { params: { productId: string } }) {
  const { productId } = params;

  return (
    <div>
      <h1>Detailed Product Page</h1>
      <div>
        <Suspense fallback={<LoadingProduct />}>
          <Product productId={productId} />
        </Suspense>
      </div>
    </div>
  );
}
