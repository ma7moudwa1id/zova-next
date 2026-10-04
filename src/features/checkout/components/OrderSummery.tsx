"use client";
import { AppState } from "@/app/store/store";
import {
  IconTag,
  IconTruck,
  IconArrowRight,
  IconLock,
  IconShoppingBag,
  IconLoader,
} from "@tabler/icons-react";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { useSelector } from "react-redux";
import { shippingInfoValues } from "../schema/CheckOutSchema";

interface orderAction {
  onSubmit: (values: shippingInfoValues) => void;
  handleSubmit: UseFormHandleSubmit<shippingInfoValues>;
  isSubmitting: boolean;
}

export default function OrderSummery({
  orderAction,
}: {
  orderAction: orderAction;
}) {
  const { onSubmit, handleSubmit, isSubmitting } = orderAction;
  const { data, numOfCartItems } = useSelector(
    (state: AppState) => state.cartReducer,
  );
  return (
    <div className="space-y-4">
      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-violet-950/5 bg-white shadow-sm">
        {/* Header - same as CartSummery */}
        <div className="bg-violet-600 px-5 py-4 text-white">
          <h3 className="flex items-center gap-2 text-base font-bold">
            <IconShoppingBag size={18} /> Order Summary
          </h3>
          <p className="mt-0.5 text-xs text-violet-100">
            {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"} • Free
            shipping over 500 EGP
          </p>
        </div>

        <div className="space-y-4 px-5 py-4">
          {/* Items preview - static */}
          <div className="space-y-3 overflow-y-auto max-h-50 scrollbar-thin scrollbar-thumb-violet-500">
            {data.products.map((item) => (
              <div className="Card flex gap-3" key={item._id}>
                <div className="size-14 shrink-0 overflow-hidden rounded-xl border border-violet-100 bg-violet-50 p-1">
                  <img
                    src={item.product.imageCover}
                    alt="Headphones"
                    className="size-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold text-gray-900">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.count} X {item.price.toLocaleString()} EGP
                  </p>
                </div>
                <span className="shrink-0 text-sm font-bold text-gray-900">
                  {item.price.toLocaleString()} EGP
                </span>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-100" />

          {/* Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>
                Subtotal ({numOfCartItems}{" "}
                {numOfCartItems === 1 ? "item" : "items"})
              </span>
              <span className="font-medium text-gray-900">
                {data.totalCartPrice.toLocaleString()} EGP
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="inline-flex items-center gap-1.5">
                Shipping <IconTruck size={15} className="text-gray-400" />
              </span>
              <span className="font-semibold text-emerald-600">
                {data.totalCartPrice > 500 ? "FREE" : "60 EGP"}
              </span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">
                {data.totalCartPrice > 500
                  ? data.totalCartPrice.toLocaleString()
                  : (data.totalCartPrice + 60).toLocaleString()}{" "}
                <span className="text-xs font-medium text-gray-400">EGP</span>
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Including VAT • Free shipping over 500 EGP
            </p>
          </div>

          <button
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-violet-200 hover:bg-violet-700 disabled:bg-violet-800 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <IconLoader className="animate-spin" />
            ) : (
              <>
                <IconLock size={16} /> Place Order <IconArrowRight size={16} />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500">
            <IconLock size={12} className="text-violet-500" /> Secure checkout •
            14-day returns
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold tracking-widest text-gray-600">
              VISA
            </span>
            <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-600">
              Mastercard
            </span>
            <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-600">
              PayPal
            </span>
            <span className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-600">
              APPLE PAY
            </span>
          </div>
        </div>
      </div>

      {/* Help card - matches cart */}
      <div className="flex gap-4 rounded-2xl bg-violet-500 p-5 text-white">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20">
          <IconLock size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold">Need help?</p>
          <p className="mt-1 text-xs leading-relaxed text-violet-100">
            Our support team is here 24/7. Chat with us or call +1 (800)
            123-4567
          </p>
        </div>
      </div>
    </div>
  );
}
