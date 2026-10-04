import BrandCard from "./BrandCard";
import { getAllBrands } from "../services/Brands";

export default async function Brands() {
  const allBrands = await getAllBrands();
  console.log(allBrands.data);

  return (
    <>
      <section className="py-10 px-4">
        <div className="container">
          <div className="inner">
            <h3 className="text-3xl font-bold capitalize before:inline-block before:h-8 before:w-1.5 before:rounded-full before:-mb-1.25 before:me-3 before:bg-linear-to-t before:from-violet-800 before:to-violet-500">
              shop by <span className="text-violet-500">Brand</span>
            </h3>

            <div className="all-categories mt-10 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {allBrands.data.map((brand) => (
                <BrandCard key={brand._id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
