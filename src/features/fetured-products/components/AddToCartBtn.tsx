"use client";
import { addToCart } from "@/features/cart/services/Cart.Actions";
import { cartActions } from "@/features/cart/slices/CartSlice";
import {
  IconCheckFilled,
  IconLoader,
  IconShoppingCart,
  IconXFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AddToCartBtn({ id }: { id: string }) {
  const { cartStatus } = cartActions;
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);

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

  return (
    <>
      <button
        onClick={() => handleAddToCart(id)}
        disabled={isAdding || isAdded}
        className={`size-10 cursor-pointer rounded-full ${isError ? "bg-red-500" : isAdded ? "bg-emerald-500" : "bg-violet-500"} flex justify-center items-center text-white hover:scale-110 hover:transition-transform hover:duration-300 disabled:cursor-not-allowed`}
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
      </button>
    </>
  );
}
