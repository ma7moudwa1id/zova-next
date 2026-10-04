"use client";
import {
  IconBox,
  IconCheck,
  IconRotateClockwise,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
  IconTruck,
} from "@tabler/icons-react";
import { Product } from "../types/types";
import { handleRating } from "@/features/fetured-products/components/ProductCard";
import { useState } from "react";

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState("details");

  return (
    <section className="px-4">
      <div className="container mt-14 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200">
          {/* Active Tab */}
          <div
            onClick={() => setTab("details")}
            className={`flex cursor-pointer shrink-0 items-center gap-2bg-violet-50/40 px-6 py-4 ${tab === "details" ? "border-b-2 border-violet-600 text-violet-600" : ""} `}
          >
            <IconBox size={20} stroke={2} />

            <span className="font-medium">Product Details</span>
          </div>

          {/* Reviews Tab */}
          <div
            onClick={() => setTab("reviews")}
            className={`flex cursor-pointer shrink-0 items-center gap-2 px-6 py-4 text-slate-700 ${tab === "reviews" ? "border-b-2 border-violet-600 text-violet-600" : ""}`}
          >
            <IconStarFilled size={18} />

            <span className="font-medium">Reviews (32)</span>
          </div>

          {/* Shipping Tab */}
          <div
            onClick={() => setTab("shipping")}
            className={`flex cursor-pointer shrink-0 items-center gap-2 px-6 py-4 text-slate-700 ${tab === "shipping" ? "border-b-2 border-violet-600 text-violet-600" : ""}`}
          >
            <IconTruck size={21} stroke={2} />

            <span className="font-medium">Shipping & Returns</span>
          </div>
        </div>

        {/* product details */}
        {tab === "details" && (
          <div className="p-6">
            {/* About */}
            <div className="mb-8">
              <h2 className="mb-5 text-[21px] font-semibold text-slate-900">
                About this Product
              </h2>

              <p className="text-[18px] text-slate-700">
                {product.description}
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Product Information */}
              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="mb-5 text-lg font-medium text-slate-900">
                  Product Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Category</span>

                    <span className="font-medium text-slate-900">
                      {product.category.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Subcategory</span>

                    <span className="font-medium text-slate-900 text-sm">
                      {product.subcategory[0].name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Brand</span>

                    <span className="font-medium text-slate-900">
                      {product.brand.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Items Sold</span>

                    <span className="font-medium text-slate-900">
                      {product.sold}+ sold
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="mb-5 text-[18px] font-medium text-slate-900">
                  Key Features
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[16px]">
                    <IconCheck
                      size={20}
                      stroke={2.5}
                      className="text-violet-600"
                    />

                    <span className="text-slate-700">
                      Premium Quality Product
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[16px]">
                    <IconCheck
                      size={20}
                      stroke={2.5}
                      className="text-violet-600"
                    />

                    <span className="text-slate-700">
                      100% Authentic Guarantee
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[16px]">
                    <IconCheck
                      size={20}
                      stroke={2.5}
                      className="text-violet-600"
                    />

                    <span className="text-slate-700">
                      Fast & Secure Packaging
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[16px]">
                    <IconCheck
                      size={20}
                      stroke={2.5}
                      className="text-violet-600"
                    />

                    <span className="text-slate-700">Quality Tested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* rating */}
        {tab === "reviews" && (
          <div className="px-6 py-8">
            {/* Rating Summary */}
            <div className="flex justify-center  items-center gap-10 flex-wrap">
              {/* Overall Rating */}
              <div className="flex w-40 shrink-0 flex-col items-center">
                <span className="text-[60px] font-semibold leading-none text-slate-900">
                  {product.ratingsAverage}
                </span>

                <div className="mt-4 flex items-center gap-1 text-yellow-400">
                  {Array.from({
                    length: handleRating(product.ratingsAverage).full,
                  }).map((_, index) => (
                    <IconStarFilled key={index} size={16} />
                  ))}
                  {handleRating(product.ratingsAverage).half && (
                    <IconStarHalfFilled size={16} />
                  )}
                  {Array.from({
                    length: handleRating(product.ratingsAverage).empty,
                  }).map((_, index) => (
                    <IconStar key={index} size={16} />
                  ))}
                </div>

                <span className="mt-4 text-center text-[16px] text-slate-500">
                  Based on {product.ratingsQuantity} reviews
                </span>
              </div>

              {/* Rating Distribution */}
              <div className="flex flex-1 flex-col gap-5">
                {/* 5 Stars */}
                <div className="flex items-center gap-4">
                  <div className="w-16 leading-6 text-slate-700">
                    5
                    <br />
                    star
                  </div>

                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[25%] rounded-full bg-yellow-400" />
                  </div>

                  <span className="w-10 text-[16px] text-slate-600">25%</span>
                </div>

                {/* 4 Stars */}
                <div className="flex items-center gap-4">
                  <div className="w-10 text-[16px] leading-6 text-slate-700">
                    4
                    <br />
                    star
                  </div>

                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[60%] rounded-full bg-yellow-400" />
                  </div>

                  <span className="w-10 text-[16px] text-slate-600">60%</span>
                </div>

                {/* 3 Stars */}
                <div className="flex items-center gap-4">
                  <div className="w-10 text-[16px] leading-6 text-slate-700">
                    3
                    <br />
                    star
                  </div>

                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[25%] rounded-full bg-yellow-400" />
                  </div>

                  <span className="w-10 text-[16px] text-slate-600">25%</span>
                </div>

                {/* 2 Stars */}
                <div className="flex items-center gap-4">
                  <div className="w-10 text-[16px] leading-6 text-slate-700">
                    2
                    <br />
                    star
                  </div>

                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[5%] rounded-full bg-yellow-400" />
                  </div>

                  <span className="w-10 text-[16px] text-slate-600">5%</span>
                </div>

                {/* 1 Star */}
                <div className="flex items-center gap-4">
                  <div className="w-10 text-[16px] leading-6 text-slate-700">
                    1
                    <br />
                    star
                  </div>

                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[5%] rounded-full bg-yellow-400" />
                  </div>

                  <span className="w-10 text-[16px] text-slate-600">5%</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px w-full bg-slate-200" />

            {/* Reviews Empty State */}
            <div className="flex min-h-62.5 flex-col items-center justify-center text-center">
              <IconStarFilled
                size={50}
                stroke={1.5}
                className="mb-5 text-slate-300"
              />

              <p className="text-[18px] text-slate-600">
                Customer reviews will be displayed here.
              </p>

              <button className="mt-6 text-[18px] font-medium text-green-600">
                Write a Review
              </button>
            </div>
          </div>
        )}

        {/* Shiiping */}
        {tab === "shipping" && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Top Two Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Information Card */}
              <div className="bg-violet-100 rounded-xl p-6 sm:p-4 border border-violet-100 shadow-xs">
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-sm">
                    <IconTruck className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Shipping Information
                  </h3>
                </div>

                <ul className="space-y-3.5 text-slate-700">
                  <li className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium">
                      Free shipping on orders over $50
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium">
                      Standard delivery: 3-5 business days
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium">
                      Express delivery available (1-2 business days)
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium">
                      Track your order in real-time
                    </span>
                  </li>
                </ul>
              </div>

              {/* Returns & Refunds Card */}
              <div className="bg-violet-100 rounded-xl p-6 sm:p-4 border border-violet-100 shadow-xs">
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-sm">
                    <IconRotateClockwise className="w-6 h-6" />
                  </div>

                  <h3 className="font-bold text-slate-900">
                    Returns & Refunds
                  </h3>
                </div>

                <ul className="space-y-3.5 text-slate-700">
                  <li className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium">
                      30-day hassle-free returns
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium">
                      Full refund or exchange available
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium">
                      Free return shipping on defective items
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <IconCheck className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium">
                      Easy online return process
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
