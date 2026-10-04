import {
  IconTag,
  IconTruck,
  IconArrowRight,
  IconLock,
  IconCheck,
} from "@tabler/icons-react";
import Link from "next/link";
import { cartInitialType } from "../slices/CartSlice";

export default function CartSummery({
  cartInfo,
}: {
  cartInfo: cartInitialType;
}) {
  const { data } = cartInfo;
  const { totalCartPrice } = data;

  return (
    <div className="space-y-4">
      {/* Order Summary */}
      <div className="overflow-hidden rounded-2xl border border-violet-950/5 bg-white shadow-sm">
        {/* Header */}
        <div className="bg-violet-600 px-5 py-4 text-white">
          <h3 className="text-base font-bold">Order Summary</h3>
          <p className="mt-0.5 text-xs text-violet-100">4 items in your cart</p>
        </div>

        <div className="space-y-4 px-5 py-4">
          {/* Free Shipping Status */}
          <div className="rounded-xl bg-violet-50 p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                {totalCartPrice > 500 ? (
                  <IconCheck size={18} stroke={2.5} />
                ) : (
                  <IconTruck size={18} />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-violet-900">
                    {totalCartPrice < 500
                      ? "Free Shipping Unlocked!"
                      : "Free Shipping"}
                  </p>

                  <span className="text-xs font-semibold text-violet-600">
                    {totalCartPrice > 500
                      ? "FREE"
                      : `${500 - totalCartPrice} EPG Left`}
                  </span>
                </div>

                <p className="mt-0.5 text-[10px] text-violet-500">
                  {totalCartPrice > 500
                    ? "You qualify for free delivery"
                    : `Spend ${500 - totalCartPrice} EGP to get free delivery`}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-violet-100">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all"
                  style={{ width: `${(totalCartPrice / 500) * 100}%` }}
                />
              </div>

              <div className="mt-1 flex justify-between text-[9px] text-violet-400">
                <span>0 EGP</span>
                <span>500 EGP</span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 text-sm">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">
                {totalCartPrice.toLocaleString()} EGP
              </span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between text-gray-600">
              <span className="inline-flex items-center gap-1.5">
                Shipping
                <IconTruck size={15} className="text-gray-400" />
              </span>

              <span className="font-semibold text-violet-600">
                {totalCartPrice === 0
                  ? 0
                  : totalCartPrice > 500
                    ? "FREE"
                    : "60 EPG"}
              </span>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">Total</span>

              <span className="text-xl font-bold text-gray-900">
                {totalCartPrice === 0
                  ? 0
                  : totalCartPrice > 500
                    ? (totalCartPrice + 0).toLocaleString()
                    : (totalCartPrice + 60).toLocaleString()}
                <span className="text-xs font-medium text-gray-400">EGP</span>
              </span>
            </div>
          </div>

          {/* Promo Code */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-medium text-gray-600 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
          >
            <IconTag size={15} />
            Apply Promo Code
          </button>

          {/* Checkout */}
          <Link
            href="/checkout"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition-colors hover:bg-violet-700"
          >
            <IconLock size={15} />
            Secure Checkout
            <IconArrowRight size={17} />
          </Link>

          {/* Trust Info */}
          <div className="flex items-center justify-center gap-4 pt-1 text-[9px] text-gray-400">
            <span className="inline-flex items-center gap-1">
              <IconLock size={11} className="text-violet-500" />
              Secure Payment
            </span>

            <span className="inline-flex items-center gap-1">
              <IconTruck size={11} className="text-violet-500" />
              Fast Delivery
            </span>
          </div>

          {/* Continue Shopping */}
          <Link
            href="#"
            className="flex items-center justify-center gap-1 text-[10px] font-medium text-violet-500 hover:text-violet-600"
          >
            Continue Shopping
            <IconArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}
