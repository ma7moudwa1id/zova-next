"use client";
import {
  IconCheck,
  IconCheckFilled,
  IconLoader,
  IconMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { CartItemType } from "../types/CartTypes";
import { removeFromCart, updateCart } from "../services/Cart.Actions";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { cartActions } from "../slices/CartSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useState } from "react";

export default function CartItem({
  cartItemInfo,
}: {
  cartItemInfo: CartItemType;
}) {
  const { product, price, count } = cartItemInfo;
  const { imageCover, category, _id, quantity, title } = product;
  const [quantityCounter, setQuantityCounter] = useState(count);

  const [isAdded, setIsAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { cartStatus } = cartActions;
  const dispatch = useDispatch();

  async function handleRemoveFromCart(id: string) {
    Swal.fire({
      title: "",
      html: `
    <div class="flex flex-col items-center gap-4 pt-2">

      <div class="flex items-center justify-center size-16 rounded-2xl bg-violet-100 text-violet-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 9v4"/>
          <path d="M12 17h.01"/>
          <path d="M10.3 3.6l-8 14A2 2 0 0 0 4 20.5h16a2 2 0 0 0 1.7-2.9l-8-14a2 2 0 0 0-3.4 0Z"/>
        </svg>
      </div>

      <div class="space-y-1">
        <h3 class="text-xl font-bold text-zinc-900">
          Delete this item?
        </h3>

        <p class="text-sm text-zinc-500">
          This action cannot be undone.
        </p>
      </div>

      <div class="w-full rounded-xl bg-violet-50 border border-violet-100 px-4 py-3">
        <p class="text-sm text-violet-700">
          Are you sure you want to permanently delete this item?
        </p>
      </div>

    </div>
  `,

      showCancelButton: true,

      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Keep it",

      confirmButtonColor: "#c82312",
      cancelButtonColor: "#7f22fe",

      color: "#18181b",
      background: "#ffffff",

      customClass: {
        popup: "rounded-3xl shadow-2xl",
        actions: "gap-3 w-full px-4",
        confirmButton: "rounded-xl px-6 py-3 font-semibold",
        cancelButton: "rounded-xl px-6 py-3 font-semibold text-zinc-700",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "",
          html: `
        <div class="flex flex-col items-center gap-3 py-2">

          <div class="flex items-center justify-center size-16 rounded-2xl bg-emerald-100 text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m5 12 4 4L19 6"/>
            </svg>
          </div>

          <h3 class="text-xl font-bold text-zinc-900">
            Deleted Successfully
          </h3>

          <p class="text-sm text-zinc-500">
            The item has been removed successfully.
          </p>

        </div>
      `,

          confirmButtonText: "Done",
          confirmButtonColor: "#7f22fe",

          background: "#ffffff",

          customClass: {
            popup: "rounded-3xl shadow-2xl",
            confirmButton: "rounded-xl px-8 py-3 font-semibold",
          },
        });

        const response = await removeFromCart(id);
        if (response.status === "fail") {
          toast.error(`${response.message}`);
          return;
        }
        dispatch(cartStatus(response));
      }
    });
  }

  async function handleUpdateCart(id: string, newQuantity: number) {

    if (quantityCounter <= quantity) {
      setIsAdding(true);
      const response = await updateCart(id, newQuantity);
      if (response.status === "success") {
        setIsAdding(false);
        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
        }, 1500);
        dispatch(cartStatus(response));
        return;
      }
      setIsAdding(false);
      return;
    }
    toast.error("no there avilable items");
  }

  return (
    <div className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm items-stretch">
      {/* Left Side: Image & Stock */}
      <div className="flex flex-col justify-between gap-2">
        {/* Product Image */}
        <Link
          href={`/products/${_id}`}
          className="size-20 sm:size-24 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-1.5"
        >
          <img
            src={imageCover}
            alt="Woman Shawl"
            className="size-full object-contain mix-blend-multiply"
          />
        </Link>

        {/* Stock */}
        {quantity > 0 ? (
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-emerald-600">
            <IconCheck size={10} stroke={3} />
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center justify-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-emerald-600">
            <IconCheck size={10} stroke={3} />
            Out Of Stock
          </span>
        )}
      </div>

      {/* Middle: Product Info & Quantity Controls */}
      <div className="min-w-0 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Product Name */}
          <h3 className="truncate text-sm sm:text-base font-semibold text-gray-900">
            {title}
          </h3>

          {/* Category + SKU */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-violet-600">
              {category.name}
            </span>
            <span className="text-[11px] text-gray-400">
              SKU: {_id.slice(-6)}
            </span>
          </div>

          {/* Unit Price */}
          <div className="pt-0.5">
            <span className="text-sm font-bold text-violet-600">
              {price.toLocaleString()} EGP
            </span>
            <span className="ml-1 text-[11px] text-gray-400">per unit</span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="mt-3 flex items-center">
          <div className="flex items-center gap-0.5 rounded-md border border-gray-200 bg-gray-50 p-0.5">
            <button
              type="button"
              disabled={isAdding}
              onClick={() => {
                setQuantityCounter((prev) => (prev > 1 ? prev - 1 : 1));
                const newQuantity = quantityCounter - 1;
                handleUpdateCart(_id, newQuantity);
              }}
              className="flex size-7 sm:size-8 items-center justify-center rounded bg-white text-gray-600 shadow-sm transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200"
            >
              <IconMinus size={12} />
            </button>

            <span className="w-7 text-center text-xs sm:text-sm font-semibold text-gray-700">
              {isAdding ? <IconLoader className="animate-spin" /> : count}
            </span>

            <button
              type="button"
              disabled={quantityCounter === quantity || isAdding}
              onClick={() => {
                setQuantityCounter((prev) =>
                  prev < quantity ? prev + 1 : quantity,
                );
                const newQuantity = quantityCounter + 1;
                handleUpdateCart(_id, newQuantity);
              }}
              className="flex size-7 sm:size-8 items-center justify-center rounded bg-violet-600 text-white shadow-sm transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-800"
            >
              <IconPlus size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Total & Delete */}
      <div className="flex shrink-0 flex-col items-end justify-between">
        {/* Total */}
        <div className="text-right">
          <span className="text-[10px] text-gray-400 block">Total</span>
          <p className="text-sm sm:text-base font-bold leading-tight text-gray-900">
            {(count * price).toLocaleString()}
            <span className="text-xs font-medium text-gray-400">EGP</span>
          </p>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => handleRemoveFromCart(_id)}
          type="button"
          aria-label="Remove item"
          className="flex size-8 items-center justify-center rounded-lg bg-red-50 text-red-400 transition-colors hover:bg-red-100 hover:text-red-500"
        >
          <IconTrash size={14} />
        </button>
      </div>
    </div>
  );
}
