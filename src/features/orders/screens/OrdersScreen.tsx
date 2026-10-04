"use client";
import { IconPackage, IconTruck, IconShieldCheck } from "@tabler/icons-react";
import AllOrders from "../components/AllOrders";
import getAllOrders from "../services/Orders.Actions";
import { useSelector } from "react-redux";
import { AppState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { Order } from "../types/OrderTypes";

export default function OrdersScreen() {
  const { userData } = useSelector((state: AppState) => state.authReducer);

  const [allOrders, setAllOrders] = useState<null | Order[]>(null);

  useEffect(() => {
    async function handleOrders() {
      if (!userData?.id) return;
      const ordersResponse = await getAllOrders(userData?.id);
      if (!ordersResponse.data) {
        return;
      }
      setAllOrders(ordersResponse.data);
    }
    handleOrders();
  }, [userData?.id]);


  return (
    <div className="min-h-screen bg-violet-50/60">
      <div className="container px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="hover:text-violet-600">
            Home
          </a>
          <span>/</span>
          <span className="font-medium text-gray-900">Orders</span>
        </nav>

        {/* Header - matches CheckoutScreen / ShopHeading */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-violet-800 p-6 sm:p-8 relative">
          <div className="overlay absolute inset-0 z-0 pointer-events-none">
            <div className="circle absolute -top-1/2 right-0 translate-x-1/2 translate-y-1/2 size-52 rounded-full bg-violet-300/20" />
            <div className="circle absolute -bottom-1/2 left-0 -translate-x-1/2 -translate-y-1/2 size-52 rounded-full bg-violet-300/20" />
          </div>
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                My Orders
              </h1>
              <p className="mt-1 text-sm font-medium text-violet-100">
                Track, manage and review your orders
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-violet-700">
                <IconPackage size={14} /> {allOrders?.length} {allOrders?.length===1?"Order":"Orders"} 
              </span>
            </div>
          </div>
        </div>

        <div className="">
          {/* Orders list */}
          <div className="">
            <AllOrders allOrders={allOrders}/>
          </div>
        </div>
      </div>
    </div>
  );
}
