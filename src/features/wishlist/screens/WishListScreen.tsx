"use client";
import { IconHeart, IconShoppingBag, IconTrash } from "@tabler/icons-react";
import WishList from "../components/WishList";
import { getWishList } from "../services/WishList.Actions";
import { useEffect, useRef, useState } from "react";
import { wishListApiResponse } from "../types/Wishlist.Types";

export default function WishListScreen() {
  const [Changed, setChanged] = useState(false);
  const [data, setData] = useState<wishListApiResponse | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    async function get() {
      const wishresponse = await getWishList();
      if (wishresponse.status === "fail") {
        setData(wishresponse.data);
        setStatus(wishresponse.status);
      }
      setData(wishresponse.data);
      setStatus(wishresponse.status);
    }
    get();
  }, [Changed]);

  return (
    <div className="min-h-screen bg-violet-50/60">
      <div className="container px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="hover:text-violet-600">
            Home
          </a>
          <span>/</span>
          <span className="font-medium text-gray-900">Wishlist</span>
        </nav>

        {/* Header - matches OrdersScreen */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-violet-800 p-6 sm:p-8">
          <div className="overlay absolute inset-0 z-0 pointer-events-none">
            <div className="circle absolute -top-1/2 right-0 size-52 translate-x-1/2 translate-y-1/2 rounded-full bg-violet-300/20" />
            <div className="circle absolute -bottom-1/2 left-0 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/20" />
          </div>

          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl flex gap-2">
                My Wishlist{" "}
                <IconHeart
                  size={30}
                  className="text-red-500 fill-current bg-violet-50 rounded-full p-1  "
                />
              </h1>
              <p className="mt-1 text-sm font-medium text-violet-100">
                Items you&apos;ve saved for later
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">
                <IconHeart size={14} className="text-red-500" /> {data?.count}{" "}
                {data?.count === 1 ? "Item" : "Items"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/20 bg-violet-200/20 px-3 py-1.5 text-xs font-semibold text-white">
                <IconShoppingBag size={14} /> Saved
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-6 rounded-xl bg-white overflow-hidden">
          <div className="header hidden md:grid grid-cols-12 w-full text-gray-700 text-sm font-medium bg-violet-100 p-4">
            <span className="md:col-span-5 2xl:col-span-6">Product</span>
            <span className="md:col-span-2 ">Price</span>
            <span className="md:col-span-2 ">Status</span>
            <span className="md:col-span-3 2xl:col-span-2">Action</span>
          </div>
          <div className="wish-list px-2">
            <WishList
              wishData={data}
              wishStatus={status}
              Changed={Changed}
              setChanged={setChanged}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
