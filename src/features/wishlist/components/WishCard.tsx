"use client";
import {
  IconCheckFilled,
  IconLoader,
  IconShoppingCart,
  IconShoppingCartUp,
  IconTrash,
  IconXFilled,
} from "@tabler/icons-react";
import { Product } from "../types/Wishlist.Types";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/features/cart/slices/CartSlice";
import { RefObject, SetStateAction, useState } from "react";
import { addToCart } from "@/features/cart/services/Cart.Actions";
import { getWishList, removeFromWishList } from "../services/WishList.Actions";
import { AppState } from "@/app/store/store";
import { wishListActions } from "../slice/WishListSlice";
import { Dispatch } from "@reduxjs/toolkit";
import Link from "next/link";

export default function WishCard({
  wishInfo,
  Changed,
  setChanged,
}: {
  wishInfo: Product;
  Changed: boolean;
  setChanged: any;
}) {
  const { _id, category, title, price, quantity, imageCover } = wishInfo;

  const { cartStatus } = cartActions;
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);

  const { withStatus } = wishListActions;

  async function handleAddToCart(id: string) {
    setIsAdding(true);

    const response = await addToCart(id);

    if (response.status === "fail") {
      toast.error(`${response.message}`);

      setIsAdding(false);
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 1500);
      return;
    }

    setIsAdding(false);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);

    dispatch(cartStatus(response));
  }

  async function unLikeProduct() {
    const response = await removeFromWishList(_id);
    if (response.status === "success") {
      setChanged(!Changed);
      dispatch(withStatus(response));
    }
  }

  return (
    <div className="group grid grid-cols-1 gap-4 px-4 py-4 border-b border-violet-950/5 md:grid-cols-12 md:items-center md:gap-0 md:px-0">
      {/* Product */}
      <div className="flex min-w-0 items-center gap-3 md:col-span-5 2xl:col-span-6">
        <Link href={`/products/${_id}`} className="size-20 shrink-0 overflow-hidden bg-gray-50">
          <img
            src={imageCover}
            alt="Wireless Headphones"
            className="size-full object-contain p-3"
          />
        </Link>

        <div className="min-w-0">
          <h3 className="truncate font-medium">{title}</h3>

          <p className="truncate text-sm font-medium text-gray-400">
            {category.name}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 md:col-span-2">
        <span className="text-sm font-semibold">
          <span className="mr-1 text-gray-400 md:hidden">Price:</span>
          {price.toLocaleString()} EGP
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 md:col-span-2">
        <span className="text-gray-400 md:hidden">Status:</span>
        {quantity > 0 ? (
          <div className="flex w-fit items-center gap-2 rounded-xl bg-emerald-100 px-2 py-1">
            <div className="size-2 rounded-full bg-emerald-400"></div>
            <span className="text-sm font-semibold text-emerald-500">
              In Stock
            </span>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Actions */}
      <div className="md:col-span-3 2xl:col-span-2">
        <div className="flex gap-2">
          <button
            onClick={() => handleAddToCart(_id)}
            disabled={isAdding || isAdded}
            className={`px-2 py-1 cursor-pointer rounded-xl text-sm font-medium ${isError ? "bg-red-500" : isAdded ? "bg-emerald-500" : "bg-violet-500"} flex justify-center items-center gap-1 text-white disabled:cursor-not-allowed`}
          >
            {isAdding ? (
              <IconLoader className="animate-spin" />
            ) : isAdded ? (
              <IconCheckFilled />
            ) : isError ? (
              <IconXFilled />
            ) : (
              <IconShoppingCart />
            )}
            <span>Add To Cart</span>
          </button>

          <button
            onClick={() => unLikeProduct()}
            className="flex items-center justify-center rounded-xl border border-gray-400 bg-gray-100 px-3 py-2 text-gray-500 transition hover:bg-gray-200"
          >
            <IconTrash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
