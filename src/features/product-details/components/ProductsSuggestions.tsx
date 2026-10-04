"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { Category } from "../types/types";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/features/fetured-products/services/services";
import { ProductResponse } from "@/features/fetured-products/types/types";
import ProductCard from "@/features/fetured-products/components/ProductCard";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function ProductSuggestions({
  product,
}: {
  product: ProductResponse;
}) {
  const [suggestedProducts, setSuggestedProducts] = useState<
    ProductResponse[] | null
  >(null);

  const productCategory: Category = product.category;

  useEffect(() => {
    async function getSuggetionProducts(productCategory: Category) {
      const response = await getAllProducts();
      const suggestion: ProductResponse[] = response?.data.filter(
        (item) =>
          item.category.name === productCategory.name &&
          item._id !== product._id,
      );

      setSuggestedProducts(suggestion);
    }
    getSuggetionProducts(productCategory);
  }, [product]);
  return (
    <>
      <section className="mt-18 mb-10 px-4">
        <div className="container">
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold capitalize before:inline-block before:h-8 before:w-1.5 before:rounded-full before:-mb-1.25 before:me-3 before:bg-linear-to-t before:from-violet-800 before:to-violet-500">
              You May Also <span className="text-violet-500">like</span>
            </h3>
            <div className="buttons flex gap-2">
              <button className="prev cursor-pointer flex justify-center items-center bg-violet-100 hover:bg-violet-500 hover:text-white transition-colors duration-300 p-2 rounded-full">
                <IconChevronLeft />
              </button>
              <button className="next cursor-pointer flex justify-center items-center bg-violet-100 hover:bg-violet-500 hover:text-white transition-colors duration-300 p-2 rounded-full">
                <IconChevronRight />
              </button>
            </div>
          </div>

          <div className="products mt-6">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 5,
                },
              }}
              navigation={{
                prevEl: ".prev",
                nextEl: ".next",
              }}
              modules={[Navigation]}
            >
              {suggestedProducts?.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
