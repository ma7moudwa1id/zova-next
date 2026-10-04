import {
  IconCreditCard,
  IconTruckDelivery,
  IconLock,
  IconShieldCheck,
} from "@tabler/icons-react";

interface paymentmethod {
  payMethod: "cash" | "card";
  setPayMethod: (payMethod: "cash" | "card") => void;
}

export default function PaymentMethod({
  paymentmethod,
}: {
  paymentmethod: paymentmethod;
}) {
  const { payMethod, setPayMethod } = paymentmethod;
  return (
    <div className="overflow-hidden rounded-2xl border border-violet-950/5 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500 text-white">
          <IconCreditCard size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">Payment Method</h3>
          <p className="text-xs font-medium text-gray-400">
            Choose how you want to pay
          </p>
        </div>
        <span className="ml-auto hidden sm:inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
          Step 2 of 2
        </span>
      </div>

      <div className="space-y-4 px-6 py-6">
        {/* Options */}
        <div className="space-y-3">
          {/* Card - selected */}
          <label
            onClick={() => setPayMethod("card")}
            className={`flex cursor-pointer items-center gap-3 rounded-xl ${payMethod === "card" ? "border-2 border-violet-500 bg-violet-50/60" : "border-gray-200 bg-white px-4 py-3.5 hover:border-violet-200 hover:bg-violet-50/40"} px-4 py-3.5`}
          >
            <input
              type="radio"
              name="paymetMethod"
              checked={payMethod === "card"}
              readOnly
              className="size-4 accent-violet-600"
            />
            <span
              className={`flex size-9 items-center justify-center rounded-full ${payMethod === "card" ? "bg-linear-to-tl from-violet-500 to-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
            >
              <IconCreditCard size={18} />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-gray-900">
                Credit / Debit Card
              </span>
              <span className="block text-xs font-medium text-gray-500">
                Visa, Mastercard, PayPal
              </span>
            </span>
            <span className="hidden gap-1.5 sm:flex">
              <span className="rounded-md border border-violet-200 bg-white px-2 py-1 text-[10px] font-bold tracking-widest text-gray-600">
                VISA
              </span>
              <span className="rounded-md border border-violet-200 bg-white px-2 py-1 text-[10px] font-bold text-gray-600">
                MC
              </span>
            </span>
          </label>

          {/* COD */}
          <label
            onClick={() => setPayMethod("cash")}
            className={`flex cursor-pointer items-center gap-3 rounded-xl ${payMethod === "cash" ? "border-2 border-violet-500 bg-violet-50/60" : "border-gray-200 bg-white px-4 py-3.5 hover:border-violet-200 hover:bg-violet-50/40"} px-4 py-3.5`}
          >
            <input
              type="radio"
              name="paymetMethod"
              checked={payMethod === "cash"}
              readOnly
              className="size-4 accent-violet-600"
            />
            <span
              className={`flex size-9 items-center justify-center rounded-full ${payMethod === "cash" ? "bg-linear-to-tl from-violet-500 to-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
            >
              <IconTruckDelivery size={18} />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-gray-900">
                Cash on Delivery
              </span>
              <span className="block text-xs font-medium text-gray-500">
                Pay when you receive your order
              </span>
            </span>
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
              No fees
            </span>
          </label>
        </div>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-3 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-white text-violet-600">
            <IconShieldCheck size={16} />
          </span>
          <p className="text-xs font-medium leading-relaxed text-violet-700">
            100% secure checkout — 14-day returns • Free support 24/7
          </p>
        </div>
      </div>
    </div>
  );
}
