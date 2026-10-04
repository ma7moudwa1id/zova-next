"use client";

import {
  IconShieldFilled,
  IconStarFilled,
  IconTruckDelivery,
} from "@tabler/icons-react";
import authbg from "../../../assets/images/auth.png";
export default function SignInImage() {
  return (
    <>
      <div
        className="hidden xl:block w-[40%] relative"
        style={{
          backgroundImage: `linear-gradient(to top , #000000cc,#0000001b),url("${authbg.src}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="p-10 absolute bottom-0 right-0 left-0 text-white space-y-4">
          <h3 className="text-3xl font-bold capitalize">
            Every allthing you need, all in one place
          </h3>
          <p className="text-gray-300/80">
            Join over 250,000+ shoppers enjoying curated designer brands,
            seamless delivery, and exclusive community perks.
          </p>
          <div className="flex gap-2 flex-wrap">
            <div className="text-sm flex items-center gap-2 p-1.5 px-2 rounded-2xl bg-violet-400/50">
              <IconStarFilled size={16} />
              <span>Premium Quality</span>
            </div>
            <div className="text-sm flex items-center gap-2 p-1.5 px-2 rounded-2xl bg-violet-400/50">
              <IconTruckDelivery size={16} />
              <span>Fast Delivery</span>
            </div>
            <div className="text-sm flex items-center gap-2 p-1.5 px-2 rounded-2xl bg-violet-400/50">
              <IconShieldFilled size={16} />
              <span>Secure Shopping</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
