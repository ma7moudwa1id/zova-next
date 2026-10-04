"use client";
import { useSelector } from "react-redux";
import CartItems from "../components/CartItems";
import CartSummery from "../components/CartSummery";
import { AppState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartScreen() {
  const response = useSelector((state: AppState) => state.cartReducer);
  const router = useRouter();
  
  useEffect(() => {
    if (response.status === "fail") {
      router.push("/signin");
    }
  }, [response.status]);

  return (
    <div className="min-h-screen bg-violet-50/60">
      <div className="container px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-violet-600">
            Home
          </a>
          <span>/</span>
          <span className="text-gray-900 font-medium">Cart</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <CartItems cartInfo={response} />
          </div>
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <CartSummery cartInfo={response} />
          </div>
        </div>
      </div>
    </div>
  );
}
