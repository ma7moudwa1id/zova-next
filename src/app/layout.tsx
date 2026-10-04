import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/provides/provides";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import { verifyToken } from "./(auth)/auth/auth.Actions";
import "@fontsource-variable/exo";
import { getCartItems } from "@/features/cart/services/Cart.Actions";
import { cartInitialType } from "@/features/cart/slices/CartSlice";
import { wishListInital } from "@/features/wishlist/slice/WishListSlice";
import { getWishList } from "@/features/wishlist/services/WishList.Actions";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zova Store",
  description: "Discover All Productus",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { isAuthenticated, userData } = await verifyToken();
  let wishState: wishListInital = {
    status: "fail",
    data: { count: 0, data: [], status: "fail" },
  };
  let cartState: cartInitialType = {
    status: "fail",
    message: "",
    cartId: "",
    numOfCartItems: 0,
    data: {
      products: [],
      totalCartPrice: 0,
    },
  };
  if (isAuthenticated) {
    const cartResponse = await getCartItems();
    if (cartResponse.status === "success") {
      cartState = cartResponse;
    }
    const wishListResponse = await getWishList();

    if (wishListResponse.status === "success") {
      wishState = wishListResponse;
    }
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers
          preloaded={{
            authReducer: {
              isAuthenticated,
              userData,
            },
            cartReducer: cartState,
            wishListReducer: wishState,
          }}
        >
          <Navbar />
          <div className="">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
