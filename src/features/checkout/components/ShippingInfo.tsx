import {
  IconMapPin,
  IconPhone,
  IconHome,
  IconBuilding,
  IconBuildingBank,
} from "@tabler/icons-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { shippingInfoValues } from "../schema/CheckOutSchema";

interface shippingInfo {
  register: UseFormRegister<shippingInfoValues>;
  errors: FieldErrors<shippingInfoValues>;
}

export default function ShippingInfo({
  shippingInfo,
}: {
  shippingInfo: shippingInfo;
}) {
  const { register, errors } = shippingInfo;
  return (
    <div className="overflow-hidden rounded-2xl border border-violet-950/5 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500 text-white">
          <IconMapPin size={20} />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">
            Shipping Information
          </h3>
          <p className="text-xs font-medium text-gray-400">
            Where should we deliver your order?
          </p>
        </div>
        <span className="ml-auto hidden sm:inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
          Step 1 of 2
        </span>
      </div>

      <form className="space-y-4 px-6 py-6">
        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-gray-700">City</span>
          <span className="relative block">
            <IconBuilding
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              {...register("city")}
              placeholder="e.g Cairo, Alex, Giza"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </span>
          {errors.city?.message && (
            <p className="text-sm text-red-500 font-medium">
              *{errors.city?.message}
            </p>
          )}
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-gray-700">
            Street Address
          </span>
          <span className="relative block">
            <IconHome
              size={16}
              className="pointer-events-none absolute left-3.5 top-5 -translate-y-1/2 text-gray-400"
            />
            <textarea
              placeholder="123 Commerce Street, Apt 4B"
              {...register("details")}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </span>
          {errors.details?.message && (
            <p className="text-sm text-red-500 font-medium">
              *{errors.details?.message}
            </p>
          )}
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-semibold text-gray-700">
            Telephone Number
          </span>
          <span className="relative block">
            <IconPhone
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="tel"
              {...register("phone")}
              placeholder="+20 1148536912"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-200"
            />
          </span>
          {errors.phone?.message && (
            <p className="text-sm text-red-500 font-medium">
              *{errors.phone?.message}
            </p>
          )}
        </label>
      </form>
    </div>
  );
}
