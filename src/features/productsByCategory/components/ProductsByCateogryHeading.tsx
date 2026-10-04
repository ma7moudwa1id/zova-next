import { IconShoppingBag } from "@tabler/icons-react";
import ProductsByCateogry from "./ProductsByCateogry";
import Link from "next/link";
import { getProductsByCategory } from "../services/ProductsByCategory";

export default async function ProductsByCateogryHeading({
  id,
}: {
  id: string;
}) {
  const response = await getProductsByCategory(id);
  
  const { data } = response;
  return (
    <section className="">
      <div className="">
        {/* Hero banner - matches Banners.tsx / SwiperSlider palette */}
        <div className="relative overflow-hidden bg-violet-800 p-6 sm:p-8 lg:p-10">
          {/* Decorative circles - same as Banners */}
          <div className="overlay absolute inset-0 z-0 pointer-events-none">
            <div className="circle absolute -top-1/2 right-0 translate-x-1/2 translate-y-1/2 size-52 rounded-full bg-violet-300/20"></div>
            <div className="circle absolute -bottom-1/2 left-0 -translate-x-1/2 -translate-y-1/2 size-52 rounded-full bg-violet-300/20"></div>
            <div className="circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 rounded-full bg-violet-500/10"></div>
          </div>

          <div className="container relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left */}
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {data[0]?.category.name} <span className="text-violet-200">cateogry</span>
              </h1>

              <p className="text-violet-100 font-medium max-w-xl text-sm sm:text-base leading-relaxed">
                Discover {data.length}+ premium mens products.
              </p>

              {/* Stats pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-violet-700 text-xs font-semibold">
                  <IconShoppingBag size={14} /> {data.length}+ Products
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar - matches Prons / FeaturedProducts card style */}
        <div className="mt-4 container p-3 sm:p-4">
          {/* Left - results + breadcrumb */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <Link
                href="/"
                className="hover:text-violet-600 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link href={"/categories"} className="hover:text-violet-600 transition-colors">
                Categories
              </Link>
              <span>/</span>
              <span className="text-violet-600 font-semibold">{data[0]?.category.name}</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              Showing {data?.length} products
            </p>
          </div>
          <div className="all-products py-6">
            <ProductsByCateogry data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
