import ProductCard from "@/features/fetured-products/components/ProductCard";
import { ProductResponse } from "@/features/fetured-products/types/types";
import { IconBox } from "@tabler/icons-react";
import Link from "next/link";

export default function ProductsByBrand({
  data,
}: {
  data: ProductResponse[];
}) {
  return (
    <>
      {data.length > 0 ? (
        <div className="all-products grid gap-6 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
          {data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 justify-center items-center">
            <span className="flex flex-col items-center gap-2 text-xl font-bold">
              <IconBox size={35} /> No Products Found
            </span>
            <Link href={"/shop"} className="btn-primary">
              View All Products
            </Link>
          </div>
        </>
      )}
    </>
  );
}
