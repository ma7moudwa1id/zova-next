"use client";
import {
  IconPackage,
  IconCalendar,
  IconCheck,
  IconEye,
  IconMapPin,
  IconCreditCard,
  IconUser,
  IconPhone,
  IconReceipt,
  IconEyeOff,
  IconClock,
  IconCashBanknote,
} from "@tabler/icons-react";
import { useState } from "react";
import { Order } from "../types/OrderTypes";

export default function OrderCard({ order }: { order: Order }) {
  const [isExpanded, setISExpanded] = useState(false);
  const {
    id,
    cartItems,
    createdAt,
    isPaid,
    paymentMethodType,
    totalOrderPrice,
    user,
    shippingAddress,
  } = order;

  return (
    <div className="overflow-hidden rounded-2xl border border-violet-950/5 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-violet-50/40 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-violet-500 text-white">
            <IconPackage size={18} />
          </span>
          <div>
            <p className="flex flex-wrap items-center gap-1.5 text-sm font-bold text-gray-900">
              Order #{id}
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-600 border border-gray-200">
                <IconCalendar size={12} className="text-violet-500" />{" "}
                {new Date(createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} •{" "}
              {paymentMethodType}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full ${paymentMethodType === "card" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"} px-3 py-1 text-xs font-semibold `}
          >
            {paymentMethodType === "card" ? (
              <>
                <IconCheck size={14} /> Shipping
              </>
            ) : (
              <>
                <IconClock size={14} /> Proccessing
              </>
            )}
          </span>
          <span className="text-sm font-bold text-gray-900">
            {totalOrderPrice.toLocaleString()}{" "}
            <span className="text-violet-500">EGP</span>
          </span>
        </div>
      </div>

      {/* Items preview */}
      <div className="space-y-3 px-5 py-4">
        <div className="order-card flex gap-3">
          <div className="relative size-14 shrink-0 rounded-xl border border-violet-100 bg-violet-50 p-1">
            <img
              src={cartItems[0].product.imageCover}
              alt={cartItems[0].product.title}
              className="size-full object-contain mix-blend-multiply"
            />
            {cartItems.length - 1 > 0 && (
              <div className="absolute size-6 bg-violet-800 -top-2 -right-2 rounded-full text-white text-[10px] font-semibold flex items-center justify-center">
                +{cartItems.length - 1}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-sm font-semibold text-gray-900">
              {cartItems[0].product.title}
            </p>
            <p className="text-xs font-medium text-gray-500">
              {cartItems[0].count} x {cartItems[0].price} EGP
            </p>
            <p className="text-xs font-bold text-violet-600">
              {cartItems[0].count * cartItems[0].price} EGP
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-600">
          {shippingAddress && (
            <>
              <span className="inline-flex items-center gap-1.5">
                <IconMapPin size={14} className="text-violet-500" />{" "}
                {shippingAddress?.city},{shippingAddress?.details}
              </span>
              <span className="hidden sm:inline size-1 rounded-full bg-gray-300" />
            </>
          )}
          <span className="inline-flex items-center gap-1.5">
            {isPaid ? (
              <IconCreditCard size={14} className="text-violet-500" />
            ) : (
              <IconCashBanknote size={14} className="text-violet-500" />
            )}{" "}
            {isPaid ? "Paid" : "Cash On Delivery"}
          </span>
        </div>

        <button
          onClick={() => setISExpanded(!isExpanded)}
          className={`inline-flex items-center justify-center gap-2 rounded-full cursor-pointer ${isExpanded ? "bg-violet-600 text-white shadow-md shadow-violet-200 hover:bg-violet-700" : "bg-gray-500 text-white shadow-md shadow-gray-200 hover:bg-gray-700"} px-5 py-2.5 text-sm font-semibold`}
        >
          {isExpanded ? (
            <>
              <IconEyeOff size={16} /> Hide Detatils
            </>
          ) : (
            <>
              <IconEye size={16} /> View Details
            </>
          )}
        </button>
      </div>

      {/* Order Details - expanded static section after View Details */}
      {isExpanded && (
        <div className="border-t border-violet-100 bg-violet-50/30">
          <div className="px-5 py-5 space-y-5">
            {/* Title */}
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-violet-500 text-white">
                <IconReceipt size={14} />
              </span>
              <h4 className="text-sm font-bold text-gray-900">Order Details</h4>
              <span className="ml-auto text-xs font-semibold text-violet-600">
                Invoice #{id}
              </span>
            </div>

            {/* Items breakdown */}
            <div className="overflow-hidden rounded-xl border border-violet-100 bg-white">
              <div className="bg-violet-50 px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs font-bold text-violet-700">
                  {cartItems.length === 1 ? "Item" : "Items"} (
                  {cartItems.length})
                </span>
                <span className="text-xs font-medium text-gray-500">
                  Qty • Price
                </span>
              </div>
              <div className="divide-y divide-gray-100 overflow-y-auto max-h-90 scrollbar-thin scrollbar-thumb-violet-800">
                {cartItems.map((item) => (
                  <div className="Card flex items-center gap-3 px-4 py-3 ">
                    <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-violet-100 bg-violet-50 p-1">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="size-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-semibold text-gray-900">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.count}x {item.price} EGP
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-violet-600">
                        {(item.count * item.price).toLocaleString()} EGP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping + Payment grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-violet-100 bg-white p-4 space-y-2">
                <p className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                  <IconMapPin size={14} className="text-violet-500" /> Shipping
                  Address
                </p>
                <p className="text-xs leading-relaxed text-gray-600">
                  <span className="font-semibold text-gray-800 flex items-center gap-1">
                    <IconUser size={12} /> {user.name}
                  </span>
                  {shippingAddress && (
                    <>
                      <span className="flex items-center gap-1">
                        <IconPhone size={12} className="text-violet-400" />{" "}
                        {shippingAddress?.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconMapPin size={12} className="text-violet-400" />
                        {shippingAddress?.city}, {shippingAddress?.details}
                      </span>
                    </>
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-violet-100 bg-amber-100 p-4 space-y-2">
                <p className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                  <IconCreditCard size={14} className="text-amber-800" />{" "}
                  Payment Summary
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-800">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      {cartItems.reduce(
                        (acc, el) => acc + el.price * el.count,
                        0,
                      )}{" "}
                      EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-800">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600">
                      {totalOrderPrice > 500 ? "FREE" : "60 EGP"}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex justify-between text-sm font-bold text-gray-900">
                    <span className="text-amber-800">Total</span>
                    <span>
                      {totalOrderPrice > 500
                        ? totalOrderPrice.toLocaleString()
                        : (totalOrderPrice + 60).toLocaleString()}{" "}
                      EGP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
