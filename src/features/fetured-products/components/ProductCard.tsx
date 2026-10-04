"use client";
import {
  IconEye,
  IconHeart,
  IconShoppingCart,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import { ProductResponse } from "../types/types";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/app/store/store";
import {
  addToWishList,
  removeFromWishList,
} from "@/features/wishlist/services/WishList.Actions";
import { wishListActions } from "@/features/wishlist/slice/WishListSlice";

export function calcSale(pricebefore: number, priceafter: number): number {
  const sale = (100 - (priceafter / pricebefore) * 100).toFixed(0);
  return -sale;
}
export function handlePrice(price: number): string {
  return price.toLocaleString();
}
export function handleRating(ratingsAverage: number): {
  full: number;
  half: boolean;
  empty: number;
} {
  const full = Math.floor(ratingsAverage);
  const half = ratingsAverage % 1 >= 0.5;
  const empty = half
    ? 5 - Math.ceil(ratingsAverage)
    : 5 - Math.floor(ratingsAverage);
  return {
    full,
    half,
    empty,
  };
}

export default function ProductCard({ product }: { product: ProductResponse }) {
  const {
    _id,
    category,
    description,
    imageCover,
    price,
    quantity,
    title,
    ratingsAverage,
    ratingsQuantity,
    priceAfterDiscount,
  } = product;

  const { data } = useSelector((state: AppState) => state.wishListReducer);
  const { withStatus } = wishListActions;
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(
    data.data.some((item) =>
      typeof item === "string" ? item === _id : item._id === _id
    ),
  );

  useEffect(() => {
    setIsLiked(
      data.data.some((item) =>
        typeof item === "string" ? item === _id : item._id === _id
      ),
    );
  }, [data.data, _id]);

  async function likeProduct() {
    const response = await addToWishList(_id);

    if (response.status === "success") {
      dispatch(withStatus(response));
    }
  }

  async function unLikeProduct() {
    const response = await removeFromWishList(_id);

    if (response.status === "success") {
      dispatch(withStatus(response));
    }
  }

  return (
    <>
      <div className="card flex h-full flex-col rounded-lg overflow-hidden shadow border border-violet-950/5 hover:border-violet-500 hover:shadow-md hover:transition-colors hover:duration-300">
        <div className="image relative h-60 bg-white">
          <img
            src={imageCover}
            alt={title}
            className="size-full object-contain"
          />
          <div className="overlay absolute inset-0">
            {priceAfterDiscount > 0 && (
              <div className="sale absolute top-2 left-2 px-3 py-0.5 text-sm text-white w-fit bg-red-800 rounded-2xl">
                {calcSale(price, priceAfterDiscount)}%
              </div>
            )}
            <div className="actions space-y-2 absolute top-4 right-4">
              <button
                onClick={() => {
                  if (!isLiked) {
                    likeProduct();
                  } else {
                    unLikeProduct();
                  }
                  setIsLiked(!isLiked);
                }}
                className="love cursor-pointer bg-white size-10 rounded-full shadow-md flex items-center justify-center group"
              >
                <IconHeart
                  className={`group-hover:text-red-500 group-hover:transition-colors group-hover:duration-300 ${isLiked ? "fill-current text-red-500" : ""}`}
                />
              </button>
              <Link
                href={`/products/${_id}`}
                className="view cursor-pointer bg-white size-10 rounded-full shadow-md flex items-center justify-center group"
              >
                <IconEye className="group-hover:text-violet-500 group-hover:transition-colors group-hover:duration-300" />
              </Link>
            </div>
          </div>
        </div>
        <div className="info flex flex-1 flex-col gap-1 p-4.5 ">
          <div className="flex flex-col gap-1 flex-none">
            <h5 className="font-medium text-xs text-violet-800 capitalize">
              {category.name}
            </h5>
            <h3 className="font-medium capitalize line-clamp-1">{title}</h3>
          </div>
          <div className="mt-auto space-y-2">
            <div className="flex gap-2 items-center">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: handleRating(ratingsAverage).full }).map(
                  (_, index) => (
                    <IconStarFilled key={index} size={16} />
                  ),
                )}
                {handleRating(ratingsAverage).half && (
                  <IconStarHalfFilled size={16} />
                )}
                {Array.from({ length: handleRating(ratingsAverage).empty }).map(
                  (_, index) => (
                    <IconStar key={index} size={16} />
                  ),
                )}
              </div>
              <span className="text-violet-500 text-xs font-medium">
                {ratingsAverage}({ratingsQuantity})
              </span>
            </div>
            <div className="rating flex justify-between items-center ">
              <div className="flex gap-x-1 flex-wrap items-center">
                <h6 className="font-bold text-lg">
                  {handlePrice(priceAfterDiscount || price)}{" "}
                  <span className="text-violet-600">EGP</span>
                </h6>
                {priceAfterDiscount > 0 && (
                  <h6 className="text-gray-500 font-medium text-sm line-through">
                    {price.toLocaleString()} EGP
                  </h6>
                )}
              </div>
              {/* addTocart */}
              <AddToCartBtn id={_id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
