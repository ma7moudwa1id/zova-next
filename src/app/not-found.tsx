import Link from "next/link";
import {
  IconSearchOff,
  IconHome,
  IconShoppingBag,
  IconArrowLeft,
  IconHelpCircle,
  IconCategory,
  IconPackage,
  IconMail,
} from "@tabler/icons-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] bg-violet-50/60 px-4 py-10 sm:py-14">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-violet-950/5 bg-white shadow-sm">
            {/* Top accent - matches OrderSummery header */}
            <div className="relative bg-violet-600 px-6 py-6 sm:px-8 sm:py-8 overflow-hidden">
              <div className="overlay absolute inset-0 z-0 pointer-events-none">
                <div className="circle absolute -top-1/2 right-0 translate-x-1/3 translate-y-1/3 size-40 rounded-full bg-violet-300/20" />
                <div className="circle absolute -bottom-1/2 left-0 -translate-x-1/3 -translate-y-1/3 size-40 rounded-full bg-violet-300/20" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white border border-white/20">
                  <IconSearchOff size={14} /> 404 • Page not found
                </span>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-7xl sm:text-8xl font-black tracking-tighter text-white leading-none">
                    4
                  </span>
                  <span className="text-7xl sm:text-8xl font-black tracking-tighter text-white leading-none">
                    0
                  </span>
                  <span className="text-7xl sm:text-8xl font-black tracking-tighter text-white leading-none">
                    4
                  </span>
                </div>

                <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
                  Oops! Lost in Zova?
                </h1>
                <p className="mt-2 max-w-xl text-sm sm:text-base font-medium leading-relaxed text-violet-100">
                  The page you are looking for does not exist, was moved, or the
                  link is broken. Let&apos;s get you back to shopping.
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6 sm:px-8 sm:py-7 space-y-6">
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 hover:bg-violet-700 transition-colors"
                >
                  <IconHome size={18} /> Back to Home
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-violet-500 bg-white px-6 py-3 text-sm font-semibold text-violet-600 hover:bg-violet-50 transition-colors"
                >
                  <IconShoppingBag size={18} /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
