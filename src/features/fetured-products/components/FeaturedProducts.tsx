import { getAllProducts } from "../services/services";
import ProductCard from "./ProductCard";

export default async function FeaturedProducts() {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className="py-10 px-4">
        <div className="container">
          <div className="inner">
            <h3 className="text-3xl font-bold capitalize before:inline-block before:h-8 before:w-1.5 before:rounded-full before:-mb-1.25 before:me-3 before:bg-linear-to-t before:from-violet-800 before:to-violet-500">
              featurd <span className="text-violet-500">products</span>
            </h3>
            <div className="all-products mt-10 grid gap-6 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 ">
              {allProducts.data.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
