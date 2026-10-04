"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import slide from "../../../assets/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';
import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function SwiperSlider() {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        loop={true}
        effect={"fade"}
        navigation={{
          nextEl: ".nextbtn",
          prevEl: ".prevbtn",
        }}
        pagination={{
          clickable : true,
        }}
        modules={[Navigation, Pagination,EffectFade]}
      >
        <SwiperSlide>
          <div
            className={`w-full h-100`}
            style={{
              backgroundImage: `linear-gradient(to top right , #8e51fff9,#8e51ccb6),url("${slide.src}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container relative top-1/2 -translate-y-1/2 p-4 text-white">
              <div className="max-w-90 wrap-break-word space-y-4">
                <h2 className="text-3xl font-bold wrap-break-word">
                  Zova Products Delivered to your Door
                </h2>
                <p className="font-medium">Get 20% off your first order</p>
                <div className="buttons space-x-2">
                  <Link href={"/shop"} className="bg-white text-violet-500 py-2 px-6 rounded-lg font-semibold cursor-pointer">
                    Shop Now
                  </Link>
                  <Link href={"/shop"} className="border border-white py-2 px-6 rounded-lg font-semibold cursor-pointer">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`w-full h-100`}
            style={{
              backgroundImage: `linear-gradient(to top right , #8e51fff9,#8e51ccb6),url("${slide.src}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container relative top-1/2 -translate-y-1/2 p-4 text-white">
              <div className="max-w-90 wrap-break-word space-y-4">
                <h2 className="text-3xl font-bold wrap-break-word">
                  Upgrade Your Everyday Essentials
                </h2>
                <p className="font-medium">
                  Discover smart tech and must-have electronics at great prices
                </p>
                <div className="buttons space-x-2">
                  <Link href={"/shop"} className="bg-white text-violet-500 py-2 px-6 rounded-lg font-semibold cursor-pointer">
                    Shop Now
                  </Link>
                  <Link href={"/shop"} className="border border-white py-2 px-6 rounded-lg font-semibold cursor-pointer">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`w-full h-100`}
            style={{
              backgroundImage: `linear-gradient(to top right , #8e51fff9,#8e51ccb6),url("${slide.src}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container relative top-1/2 -translate-y-1/2 p-4 text-white">
              <div className="max-w-90 wrap-break-word space-y-4">
                <h2 className="text-3xl font-bold wrap-break-word">
                  New Styles. New Favorites.
                </h2>
                <p className="font-medium">
                  Explore the latest fashion picks made for every look
                </p>
                <div className="buttons space-x-2">
                  <Link href={"/shop"} className="bg-white text-violet-500 py-2 px-6 rounded-lg font-semibold cursor-pointer">
                    Shop Now
                  </Link>
                  <Link href={"/shop"} className="border border-white py-2 px-6 rounded-lg font-semibold cursor-pointer">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <button className="prevbtn size-12 hidden md:flex absolute z-10 top-1/2 left-5 -translate-y-1/2 rounded-full bg-white justify-center items-center text-violet-500">
        <IconCaretLeftFilled />
      </button>
      <button className="nextbtn size-12 hidden md:flex absolute z-10 top-1/2 right-5 -translate-y-1/2 rounded-full bg-white justify-center items-center text-violet-500">
        <IconCaretRightFilled />
      </button>
    </div>
  );
}
