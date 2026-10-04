import {
  IconArrowRight,
  IconBrandAppleFilled,
  IconBrandGooglePlay,
  IconMail,
  IconSparkles,
  IconTag,
  IconTruck,
} from "@tabler/icons-react";

export default function UpdatesNews() {
  return (
    <>
      <div className="container my-6 overflow-hidden rounded-4xl border border-violet-100 bg-violet-50/40 p-6 sm:p-8 lg:p-10 shadow-xl shadow-violet-300/50">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* ================= LEFT : NEWSLETTER ================= */}
          <div className="flex flex-1 flex-col justify-center lg:pr-10">
            {/* Newsletter Label */}
            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
                <IconMail size={28} stroke={2} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">
                  Newsletter
                </p>

                <p className="text-sm text-gray-500">50,000+ subscribers</p>
              </div>
            </div>

            {/* Heading */}
            <div className="mt-7">
              <h3 className="text-3xl font-extrabold leading-tight text-violet-950 sm:text-4xl">
                Get the Freshest Updates
                <span className="block text-violet-600">Delivered Free</span>
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2.5 shadow-sm">
                <span className="flex size-8 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <IconSparkles size={16} />
                </span>

                <span className="text-sm font-medium text-gray-600">
                  Fresh Picks Weekly
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2.5 shadow-sm">
                <span className="flex size-8 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <IconTruck size={16} />
                </span>

                <span className="text-sm font-medium text-gray-600">
                  Free Delivery Codes
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2.5 shadow-sm">
                <span className="flex size-8 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <IconTag size={16} />
                </span>

                <span className="text-sm font-medium text-gray-600">
                  Members-Only Deals
                </span>
              </div>
            </div>

            {/* Email Form */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <IconMail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-800 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <button
                type="button"
                className="h-14 rounded-2xl bg-violet-600 px-7 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-all hover:bg-violet-700 hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  Subscribe
                  <IconArrowRight size={18} />
                </span>
              </button>
            </div>

            {/* Privacy text */}
            <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
              <IconSparkles size={13} className="text-violet-500" />
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          {/* ================= DIVIDER ================= */}
          <div className="my-8 h-px w-full bg-violet-100 lg:my-0 lg:mx-10 lg:h-auto lg:w-px" />

          {/* ================= RIGHT : MOBILE APP ================= */}
          <div className="relative flex w-full shrink-0 flex-col justify-center overflow-hidden rounded-[28px] bg-violet-950 p-7 text-white sm:p-8 lg:w-110">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-violet-600/20" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 size-52 rounded-full bg-violet-500/10" />

            <div className="relative z-10">
              {/* App Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-300">
                📱
                <span>MOBILE APP</span>
              </div>

              {/* App Heading */}
              <h3 className="mt-6 text-2xl font-extrabold leading-tight sm:text-3xl">
                Shop Faster on
                <span className="block text-violet-300">Our App</span>
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-violet-100/70">
                Get app-exclusive deals & 15% off your first order.
              </p>

              {/* App Store */}
              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-3.5 text-left transition hover:bg-white/15"
                >
                  <span className="text-2xl"><IconBrandAppleFilled/></span>

                  <span>
                    <span className="block text-[10px] uppercase tracking-wide text-white/50">
                      Download on
                    </span>

                    <span className="block text-base font-bold">App Store</span>
                  </span>
                </button>

                {/* Google Play */}
                <button
                  type="button"
                  className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-3.5 text-left transition hover:bg-white/15"
                >
                  <span className="text-xl"><IconBrandGooglePlay/></span>

                  <span>
                    <span className="block text-[10px] uppercase tracking-wide text-white/50">
                      Get it on
                    </span>

                    <span className="block text-base font-bold">
                      Google Play
                    </span>
                  </span>
                </button>
              </div>

              {/* Rating */}
              <div className="mt-7 flex items-center gap-2 text-sm">
                <span className="tracking-wide text-yellow-400">★★★★★</span>

                <span className="text-white/60">4.9 · 100K+ downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
