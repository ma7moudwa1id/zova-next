import ProductCard from "@/features/fetured-products/components/ProductCard";
import { getAllProducts } from "@/features/fetured-products/services/services";
import { ProductResponse } from "@/features/fetured-products/types/types";

export default async function ShopProducts({
  data,
}: {
  data: ProductResponse[];
}) {
  return (
    <div className="all-products grid gap-6 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
      {data.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
