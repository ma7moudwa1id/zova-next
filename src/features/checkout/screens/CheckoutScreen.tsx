"use client";
import ShippingInfo from "../components/ShippingInfo";
import PaymentMethod from "../components/PaymentMethod";
import OrderSummery from "../components/OrderSummery";
import { IconFileInvoice } from "@tabler/icons-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { checkOutSchema, shippingInfoValues } from "../schema/CheckOutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import checkOutActions, {
  cardOrder,
  cashOrder,
} from "../services/CheckOut.Actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/app/store/store";
import { toast } from "sonner";
import { cartActions } from "@/features/cart/slices/CartSlice";
import { useRouter } from "next/navigation";

export default function CheckoutScreen() {
  const [payMethod, setPayMethod] = useState<"cash" | "card">("cash");

  const { cartId } = useSelector((state: AppState) => state.cartReducer);

  const { cartClear } = cartActions;
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    setError,
    handleSubmit,
  } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkOutSchema),
  });

  const onSubmit: SubmitHandler<shippingInfoValues> = async (values) => {
    const response = await checkOutActions(values);

    if (response.status === "failed") {
      return;
    }

    if (payMethod === "cash") {
      const payResponse = await cashOrder(cartId, values);
      if (payResponse.data?.status === "success") {
        toast.success("Order Added Sucessfully");
        dispatch(cartClear());
        reset();
        setTimeout(() => {
          router.push("/orders");
        }, 3000);
      } else {
        toast.error("Failed To Complete Your Order");
      }
    } else {
      const payResponse = await cardOrder(cartId, values, location.origin);
      console.log(payResponse);

      if (payResponse.data?.status === "success") {
        setTimeout(() => {
          if (!payResponse.data?.session.url) return;
          location.href = payResponse.data?.session?.url;
        }, 3000);
        reset();
      } else {
        toast.error("Failed To Complete Your Order");
      }
    }
  };

  return (
    <div className="min-h-screen bg-violet-50/60">
      <div className="container px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="hover:text-violet-600">
            Home
          </a>
          <span>/</span>
          <a href="/cart" className="hover:text-violet-600">
            Cart
          </a>
          <span>/</span>
          <span className="font-medium text-gray-900">Checkout</span>
        </nav>

        {/* Title */}
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="size-10 rounded-xl flex items-center justify-center bg-violet-500 text-white">
              <IconFileInvoice />
            </div>{" "}
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Complete Your Order
            </h1>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Complete your order in a few steps
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* Left - forms */}
          <div className="space-y-6 lg:col-span-2">
            <ShippingInfo shippingInfo={{ register, errors }} />
            <PaymentMethod paymentmethod={{ payMethod, setPayMethod }} />
          </div>

          {/* Right - summary sticky */}
          <div className="lg:sticky lg:top-24 lg:col-span-1">
            <OrderSummery
              orderAction={{ onSubmit, handleSubmit, isSubmitting }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
