"use client";
import {
  IconBoltFilled,
  IconCheckFilled,
  IconChevronRight,
  IconHeadset,
  IconHeart,
  IconHome,
  IconLoader,
  IconRotate,
  IconShare,
  IconShieldHalfFilled,
  IconShoppingCart,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
  IconTruckFilled,
  IconXFilled,
} from "@tabler/icons-react";
import ProductGallery from "./ProductGallery";
import { useEffect, useState } from "react";
import { getSpecificProduct } from "../services/services";
import { Product } from "../types/types";
import Link from "next/link";
import {
  calcSale,
  handleRating,
} from "@/features/fetured-products/components/ProductCard";
import ProductTabs from "./ProductTabs";
import ProductSuggestions from "./ProductsSuggestions";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/features/cart/slices/CartSlice";
import { addToCart, updateCart } from "@/features/cart/services/Cart.Actions";
import { toast } from "sonner";
import { AppState } from "@/app/store/store";
import {
  addToWishList,
  removeFromWishList,
} from "@/features/wishlist/services/WishList.Actions";
import { wishListActions } from "@/features/wishlist/slice/WishListSlice";

export default function ProductDetails({ id }: { id: string }) {
  const [quantityCounter, setQuantityCounter] = useState(1);

  const [product, setProduct] = useState<Product | null>(null);

  const { data } = useSelector((state: AppState) => state.wishListReducer);
  const { withStatus } = wishListActions;

  const loading = (
    <section className="py-2 px-4">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
          <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
        </div>

        <div className="mt-10 grid grid-cols-12 gap-8">
          {/* Left */}
          <div className="col-span-full xl:col-span-3">
            <div className="aspect-square rounded-xl bg-gray-200 animate-pulse" />

            <div className="mt-3 flex gap-2">
              <div className="h-16 flex-1 rounded-lg bg-gray-200 animate-pulse" />
              <div className="h-16 flex-1 rounded-lg bg-gray-200 animate-pulse" />
              <div className="h-16 flex-1 rounded-lg bg-gray-200 animate-pulse" />
              <div className="h-16 flex-1 rounded-lg bg-gray-200 animate-pulse" />
            </div>
          </div>

          {/* Right */}
          <div className="col-span-full xl:col-span-9">
            <div className="rounded-xl border-2 border-gray-200 p-6">
              <div className="space-y-5">
                <div className="h-7 w-1/4 rounded-full bg-gray-200 animate-pulse" />

                <div className="h-10 w-3/4 rounded bg-gray-200 animate-pulse" />

                <div className="h-5 w-1/4 rounded bg-gray-200 animate-pulse" />

                <div className="h-9 w-1/4 rounded bg-gray-200 animate-pulse" />

                <div className="h-8 w-28 rounded-full bg-gray-200 animate-pulse" />

                <div className="space-y-2 border-t border-gray-200 pt-6">
                  <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
                </div>

                <div className="h-12 w-40 rounded-xl bg-gray-200 animate-pulse" />

                <div className="h-16 w-full rounded-xl bg-gray-200 animate-pulse" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="h-14 rounded-xl bg-gray-200 animate-pulse" />
                  <div className="h-14 rounded-xl bg-gray-200 animate-pulse" />
                  <div className="col-span-full h-14 rounded-xl bg-gray-200 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 md:grid-cols-3">
                  <div className="h-12 rounded bg-gray-200 animate-pulse" />
                  <div className="h-12 rounded bg-gray-200 animate-pulse" />
                  <div className="h-12 rounded bg-gray-200 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  useEffect(() => {
    async function fetchProductInfo() {
      const response = await getSpecificProduct(id);

      if (response.success) {
        setProduct(response.data.data);
      }
      if (!response.success) {
        return;
      }
    }

    fetchProductInfo();
  }, [id]);

  const { cartStatus } = cartActions;
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    if (product) {
      setWishlist(
        data.data.some((item) =>
          typeof item === "string" ? item === product._id : item._id === product._id
        ),
      );
    }
  }, [product?._id, data.data]);

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

    if (quantityCounter > 1) {
      const response = await updateCart(id, quantityCounter);
      setQuantityCounter(1);
      if (response.status === "fail") {
        return;
      }
      dispatch(cartStatus(response));
      return;
    }

    dispatch(cartStatus(response));
  }

  if (!product) {
    return loading;
  }

  const {
    images,
    _id,
    brand,
    category,
    description,
    price,
    quantity,
    ratingsAverage,
    ratingsQuantity,
    priceAfterDiscount,
    imageCover,
    title,
  } = product;

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
      <section className="py-2 px-4">
        <div className="container">
          <div className="top-navigator">
            <ul className="flex gap-1 items-center text-gray-500">
              <li>
                <Link
                  className="flex gap-1 items-center font-medium text-sm capitalize"
                  href={"/"}
                >
                  <IconHome size={18} /> Home
                </Link>
              </li>
              <li>
                <IconChevronRight />
              </li>
              <li className="text-sm font-medium capitalize">cateogy</li>
              <li>
                <IconChevronRight />
              </li>
              <li className="text-sm font-medium capitalize text-violet-950">
                title
              </li>
            </ul>
          </div>
          <div className="product mt-10 gap-8 grid grid-cols-12">
            <div className="product-images col-span-full xl:col-span-3 static xl:sticky top-10 h-fit ">
              <ProductGallery imageCover={imageCover} productImages={images} />
            </div>
            <div className="product-details col-span-full xl:col-span-9">
              <div className="inner p-6 border-2 border-gray-200 rounded-xl">
                <div className="flex gap-2 items-center">
                  <div className="category py-1.5 px-3 rounded-full bg-violet-100 text-xs font-medium text-violet-500 capitalize">
                    {category.name}
                  </div>
                  <div className="category py-1.5 px-3 rounded-full bg-gray-200 text-xs font-medium text-gray-600 capitalize">
                    {brand.name}
                  </div>
                </div>
                <h2 className="font-bold text-3xl mt-4">{title}</h2>
                <div className="rating mt-3 flex gap-2 items-center">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({
                      length: handleRating(ratingsAverage).full,
                    }).map((_, index) => (
                      <IconStarFilled key={index} size={16} />
                    ))}
                    {handleRating(ratingsAverage).half && (
                      <IconStarHalfFilled size={16} />
                    )}
                    {Array.from({
                      length: handleRating(ratingsAverage).empty,
                    }).map((_, index) => (
                      <IconStar key={index} size={16} />
                    ))}
                  </div>
                  <span className="text-violet-500 font-medium">
                    {ratingsAverage}({ratingsQuantity})
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <div className="price font-bold text-3xl">
                    {(priceAfterDiscount || price).toLocaleString()} EGP
                  </div>
                  {priceAfterDiscount && (
                    <span className="text-xl line-through text-gray-500 font-normal">
                      {price.toLocaleString()} EGP
                    </span>
                  )}
                  {priceAfterDiscount && (
                    <div className="py-1.5 px-3 rounded-full bg-red-700 text-white text-xs w-fit">
                      Save {-calcSale(price, priceAfterDiscount)}%
                    </div>
                  )}
                </div>
                {quantity > 0 ? (
                  <div className="stock mt-6 w-fit capitalize py-1.5 px-3 rounded-full bg-green-50 text-green-400 font-medium text-sm flex items-center gap-1">
                    <div className="size-2 bg-green-400 rounded-full"></div> in
                    stock
                  </div>
                ) : (
                  <div className="stock mt-6 w-fit capitalize py-1.5 px-3 rounded-full bg-red-50 text-red-400 font-medium text-sm flex items-center gap-1">
                    <div className="size-2 bg-red-400 rounded-full"></div> out
                    of stock
                  </div>
                )}
                <div className="description pt-5 mt-6 border-t border-gray-200">
                  <p className="font-medium text-gray-600">{description}</p>
                </div>
                <div className="quantity mt-6 space-y-2">
                  <h4 className="font-medium text-sm">Quantity</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 border-2 border-gray-200 rounded-xl overflow-hidden w-fit">
                      <button
                        onClick={() => {
                          setQuantityCounter((prev) =>
                            prev > 1 ? prev - 1 : 1,
                          );
                        }}
                        className="py-1.5 px-4 text-3xl text-gray-500 hover:bg-gray-200 hover:text-violet-500 cursor-pointer transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="px-4 w-10 font-medium">
                        {quantityCounter}
                      </span>
                      <button
                        onClick={() => {
                          setQuantityCounter((prev) =>
                            prev < quantity ? prev + 1 : quantity,
                          );
                        }}
                        className="py-1.5 px-4 text-3xl text-gray-500 hover:bg-gray-200 hover:text-violet-500 cursor-pointer transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-medium text-gray-500">
                      {quantity} avilable
                    </span>
                  </div>
                </div>
                <div className="total-price mt-6 bg-gray-100 rounded-xl p-4 flex items-center justify-between">
                  <h4 className="font-medium">Total Price:</h4>
                  <h4 className="font-bold text-2xl text-violet-500">
                    {(priceAfterDiscount || price) * quantityCounter} EGP
                  </h4>
                </div>
                <div className="actions mt-6 grid md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAddToCart(_id)}
                    disabled={isAdding || isAdded}
                    className={`flex items-center justify-center cursor-pointer font-medium gap-2 py-3.5 px-6 rounded-xl ${isError ? "bg-red-500" : isAdded ? "bg-emerald-500" : "bg-violet-500"} text-white shadow-md shadow-violet-200 disabled:cursor-not-allowed`}
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
                    Add To Cart
                  </button>
                  <button className="flex items-center justify-center cursor-pointer font-medium gap-2 py-3.5 px-6 rounded-xl bg-violet-950 text-white">
                    <IconBoltFilled />
                    Buy Now
                  </button>
                  <div className="col-span-full flex gap-2">
                    <button
                      onClick={() => {
                        if (!wishlist) {
                          likeProduct();
                        } else {
                          unLikeProduct();
                        }
                        setWishlist(!wishlist);
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 cursor-pointer py-3.5 px-6 border-2 ${wishlist ? "bg-red-100 border-red-200 text-red-700 hover:border-red-500" : "bg-transparent border-gray-200 hover:border-violet-500 hover:text-violet-500"}  transition-colors duration-200 rounded-xl font-medium`}
                    >
                      <IconHeart
                        className={`${wishlist ? "text-red-700 fill-current" : ""}`}
                      />
                      Add To Wishlist
                    </button>
                    <button className="px-6 py-3.5 rounded-xl cursor-pointer border-2 border-gray-200">
                      <IconShare />
                    </button>
                  </div>
                </div>
                <div className="prons mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="meza">
                    <div className="flex items-center gap-4">
                      <div className="icon size-10 rounded-full flex justify-center items-center bg-violet-300 text-violet-700">
                        <IconTruckFilled size={18} />
                      </div>
                      <div>
                        <h6 className="text-sm font-semibold">Free Shipping</h6>
                        <span className="text-xs font-medium">
                          Orders over $50
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="meza">
                    <div className="flex items-center gap-4">
                      <div className="icon size-10 rounded-full flex justify-center items-center bg-violet-300 text-violet-700">
                        <IconShieldHalfFilled size={18} />
                      </div>
                      <div className="*:m-0">
                        <h6 className="text-sm font-semibold">
                          Secure Payment
                        </h6>
                        <span className="text-xs font-medium">
                          100% Protected
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="meza">
                    <div className="flex items-center gap-4">
                      <div className="icon size-10 rounded-full flex justify-center items-center bg-violet-300 text-violet-700">
                        <IconRotate size={18} />
                      </div>
                      <div className="*:m-0">
                        <h6 className="text-sm font-semibold">
                          30 Days Returns
                        </h6>
                        <span className="text-xs font-medium">Money back</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductTabs product={product} />
      <ProductSuggestions product={product} />
    </>
  );
}
