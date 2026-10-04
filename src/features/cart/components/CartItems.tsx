import {
  IconMinus,
  IconPlus,
  IconTrash,
  IconCheck,
  IconArrowLeft,
  IconShoppingCart,
  IconShoppingCartFilled,
  IconBox,
} from "@tabler/icons-react";
import Link from "next/link";
import CartItem from "./CartItem";
import { cartActions, cartInitialType } from "../slices/CartSlice";
import { clearCart } from "../services/Cart.Actions";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function CartItems({ cartInfo }: { cartInfo: cartInitialType }) {
  const { data, numOfCartItems } = cartInfo;
  const { products } = data;
  const { cartStatus } = cartActions;
  const dispatch = useDispatch();

  async function handleClearCart() {
    Swal.fire({
      title: "",
      html: `
    <div class="flex flex-col items-center gap-4 pt-2">

      <div class="flex items-center justify-center size-16 rounded-2xl bg-violet-100 text-violet-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 9v4"/>
          <path d="M12 17h.01"/>
          <path d="M10.3 3.6l-8 14A2 2 0 0 0 4 20.5h16a2 2 0 0 0 1.7-2.9l-8-14a2 2 0 0 0-3.4 0Z"/>
        </svg>
      </div>

      <div class="space-y-1">
        <h3 class="text-xl font-bold text-zinc-900">
          Delete this item?
        </h3>

        <p class="text-sm text-zinc-500">
          This action cannot be undone.
        </p>
      </div>

      <div class="w-full rounded-xl bg-violet-50 border border-violet-100 px-4 py-3">
        <p class="text-sm text-violet-700">
          Are you sure you want to permanently delete this item?
        </p>
      </div>

    </div>
  `,

      showCancelButton: true,

      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Keep it",

      confirmButtonColor: "#c82312",
      cancelButtonColor: "#7f22fe",

      color: "#18181b",
      background: "#ffffff",

      customClass: {
        popup: "rounded-3xl shadow-2xl",
        actions: "gap-3 w-full px-4",
        confirmButton: "rounded-xl px-6 py-3 font-semibold",
        cancelButton: "rounded-xl px-6 py-3 font-semibold text-zinc-700",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "",
          html: `
        <div class="flex flex-col items-center gap-3 py-2">

          <div class="flex items-center justify-center size-16 rounded-2xl bg-emerald-100 text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m5 12 4 4L19 6"/>
            </svg>
          </div>

          <h3 class="text-xl font-bold text-zinc-900">
            Deleted Successfully
          </h3>

          <p class="text-sm text-zinc-500">
            The item has been removed successfully.
          </p>

        </div>
      `,

          confirmButtonText: "Done",
          confirmButtonColor: "#7f22fe",

          background: "#ffffff",

          customClass: {
            popup: "rounded-3xl shadow-2xl",
            confirmButton: "rounded-xl px-8 py-3 font-semibold",
          },
        });
        const response = await clearCart();
        if (response.status === "fail") {
          toast.error(`${response.message}`);
          return;
        }
        dispatch(cartStatus(response));
      }
    });
  }

  return (
    <div className="rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex justify-center items-center size-10 rounded-xl bg-violet-500 text-white">
          <IconShoppingCartFilled />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Shopping Cart{" "}
          <span className="text-gray-400 font-medium text-base">
            ({numOfCartItems} {numOfCartItems === 1 ? "item" : "items"})
          </span>
        </h2>
      </div>

      {/* Single static item */}
      <div className="space-y-4 py-4">
        {products?.length > 0 ? (
          products.map((item) => (
            <CartItem key={item._id} cartItemInfo={item} />
          ))
        ) : (
          <div className="flex items-center justify-center min-h-50">
            <div className="flex flex-col gap-2 items-center text-2xl font-medium">
              <IconBox size={50} className="text-violet-500" />
              Cart Is Empty
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex  items-center justify-between gap-3 px-6 py-4 bg-violet-50/80 border-t border-gray-100">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
        >
          <IconArrowLeft size={18} /> Continue Shopping
        </Link>
        <button
          onClick={ () =>  handleClearCart()}
          className="flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          <IconTrash size={16} /> Clear Cart
        </button>
      </div>
    </div>
  );
}
