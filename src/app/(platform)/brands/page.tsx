import BrandsScreen from "@/features/brands/screens/BrandsScreen";
import CategoriesScreen from "@/features/categories/screens/Categories.Screen";
import { IconCategory } from "@tabler/icons-react";

export default function BrandsPage() {
  return (
    <>
      <div>
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
                All <span className="text-violet-200">Brands</span>
              </h1>

              <p className="text-violet-100 font-medium max-w-xl text-sm sm:text-base leading-relaxed">
                Discover All Brands
              </p>

              {/* Stats pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-violet-700 text-xs font-semibold">
                  <IconCategory size={14} /> Brand
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-violet-200/20 border border-violet-300/20 text-white text-xs font-semibold">
                  Free Shipping over 500 EGP
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-violet-200/20 border border-violet-300/20 text-white text-xs font-semibold">
                  14-Day Returns
                </span>
              </div>
            </div>
          </div>
        </div>
        <BrandsScreen />
      </div>
    </>
  );
}
