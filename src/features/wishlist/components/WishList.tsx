import { Dispatch, SetStateAction } from "react";
import { wishListApiResponse } from "../types/Wishlist.Types";
import WishCard from "./WishCard";

export default function WishList({
  wishData,
  wishStatus,
  Changed,
  setChanged,
}: {
  wishData: wishListApiResponse | null;
  wishStatus: string;
  Changed: boolean;
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const empty = (
    <>
      {/* Empty state - hidden by default, styled to match OrderCard/Cart empty */}
      <div className=" my-4 flex-col items-center justify-center rounded-2xl border border-violet-100 bg-white p-10 text-center shadow-sm">
        <span className="flex size-14 items-center justify-center rounded-full bg-violet-50 text-violet-500">
          ♡
        </span>
        <h3 className="mt-3 text-base font-bold text-gray-900">
          Your wishlist is empty
        </h3>
        <p className="mt-1 text-sm font-medium text-gray-500">
          Save items you love — we&apos;ll keep them here.
        </p>
        <a
          href="/shop"
          className="mt-4 inline-flex rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Browse Shop
        </a>
      </div>
    </>
  );
  if (!wishData) return empty;
  const { data } = wishData;
  return (
    <div className="space-y-4">
      {/* Grid of cards - static */}
      <div className="space-y-2">
        {data.map((item) => {
          if (typeof item === "string") return null;
          return (
            <WishCard
              key={item._id}
              wishInfo={item}
              Changed={Changed}
              setChanged={setChanged}
            />
          );
        })}
      </div>

      {wishData.data.length === 0 && empty}
    </div>
  );
}
