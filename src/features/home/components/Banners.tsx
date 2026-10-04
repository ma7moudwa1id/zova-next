import Link from "next/link";

export default function Banners() {
  return (
    <>
      <section className="">
        <div className="container py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="banner p-8 bg-violet-800 rounded-2xl relative overflow-hidden">
                <div className="overlay absolute inset-0 z-0 pointer-events-none">
                    <div className="circle absolute -top-1/2 right-0 translate-y-1/2 translate-x-1/2 size-40 rounded-full bg-violet-300/20"></div>
                    <div className="circle absolute -bottom-1/2 left-0 -translate-y-1/2 -translate-x-1/2 size-40 rounded-full bg-violet-300/20"></div>
                </div>
              <div className="content relative z-10 space-y-4 text-white">
                <div className="badge py-1 px-3 rounded-full bg-violet-200/40 text-white w-fit font-medium text-sm">
                  🔥Deal For Day
                </div>

                <h2 className="text-3xl font-bold">Fresh Organic Fruits</h2>
                <p className="text-violet-50/80 font-medium">
                  Get up to 40% off on selected organic fruits
                </p>
                <div className="flex gap-4 items-center">
                  <h3 className="text-3xl font-bold">40% OFF</h3>
                  <span className="font-semibold text-xs text-violet-50/80">
                    Use code:{" "}
                    <span className="text-white font-bold">ORGANIC40</span>
                  </span>
                </div>

                <Link href={"/shop"} className="bg-white text-violet-500 py-3 px-6 rounded-full font-semibold cursor-pointer hover:-translate-y-0.5 hover:transition-transform hover:duration-300">
                  Shop Now
                </Link>
              </div>
            </div>


            <div className="banner p-8 bg-red-900 rounded-2xl relative overflow-hidden">
                <div className="overlay absolute inset-0 z-0 pointer-events-none">
                    <div className="circle absolute -top-1/2 right-0 translate-y-1/2 translate-x-1/2 size-40 rounded-full bg-red-300/20"></div>
                    <div className="circle absolute -bottom-1/2 left-0 -translate-y-1/2 -translate-x-1/2 size-40 rounded-full bg-red-300/20"></div>
                </div>
              <div className="content relative space-y-4 text-white z-10">
                <div className="badge py-1 px-3 rounded-full bg-red-200/40 text-white w-fit font-medium text-sm">
                  🌟New Arrivals
                </div>

                <h2 className="text-3xl font-bold">Exotic Vegetables</h2>
                <p className="text-violet-50/80 font-medium">
                  Discover our latest collection of premium vegetables
                </p>
                <div className="flex gap-4 items-center">
                  <h3 className="text-3xl font-bold">25% OFF</h3>
                  <span className="font-semibold text-xs text-violet-50/80">
                    Use code: 
                    <span className="text-white font-bold">FRESH25</span>
                  </span>
                </div>

                <Link href={"/shop"} className="bg-white text-red-700  py-3 px-6 rounded-full font-semibold cursor-pointer hover:-translate-y-0.5 transition-transform duration-300">
                  Explore Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
