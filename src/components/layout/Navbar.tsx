"use client";
import {
  IconGiftFilled,
  IconHeadset,
  IconHeart,
  IconLogout,
  IconMail,
  IconMenu2Filled,
  IconPackage,
  IconPhoneFilled,
  IconSearch,
  IconShoppingCartFilled,
  IconTruckFilled,
  IconUser,
  IconUserFilled,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react";
import logo from "../../assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/app/store/store";
import { deleteToken } from "@/app/(auth)/auth/auth.Actions";
import { authActions } from "@/app/(auth)/slice/auth.Slice";
import { cartActions } from "@/features/cart/slices/CartSlice";
import { wishListActions } from "@/features/wishlist/slice/WishListSlice";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, userData } = useSelector(
    (store: AppState) => store.authReducer,
  );
  const { authStatus, logOut } = authActions;
  const { logOutCart } = cartActions;
  const { clearWish } = wishListActions;
  const dispatch = useDispatch();
  const route = useRouter();
  const pathName = usePathname();

  const { numOfCartItems } = useSelector(
    (state: AppState) => state.cartReducer,
  );

  const { data } = useSelector((state: AppState) => state.wishListReducer);
  console.log();
  

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenu(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setUserMenu(false);
    }
    if (userMenu) {
      document.addEventListener("mousedown", onClickOutside);
      document.addEventListener("keydown", onEsc);
    }
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [userMenu]);

  useEffect(() => {
    setUserMenu(false);
  }, [pathName]);

  return (
    <>
      <div className="px-4 h-8 hidden xl:block border-b border-gray-300 bg-white">
        <div className="container py-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="flex gap-1 items-center">
                <IconTruckFilled
                  stroke={2}
                  size={18}
                  className="text-sm fill-current inline-block text-violet-500"
                />
                <span className="text-gray-700 text-sm">
                  Free Shipping on Orders 500 EGP
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <IconGiftFilled
                  stroke={2}
                  size={18}
                  className="text-sm fill-current inline-block text-violet-500"
                />
                <span className="text-gray-700 text-sm">
                  New Arrivals Daily
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-4 items-center">
                <div className="flex gap-1 items-center group">
                  <IconPhoneFilled
                    stroke={2}
                    size={18}
                    className="text-sm inline-block text-gray-600 group-hover:text-violet-500 transition-colors duration-200"
                  />
                  <Link
                    href={""}
                    className="text-gray-700 text-sm group-hover:text-violet-500 transition-colors duration-200"
                  >
                    +1 (800) 123-4567
                  </Link>
                </div>
                <div className="flex gap-1 items-center group">
                  <IconMail
                    stroke={2}
                    size={18}
                    className="text-sm inline-block text-gray-600 group-hover:text-violet-500 transition-colors duration-200"
                  />
                  <Link
                    href={""}
                    className="text-gray-700 text-sm group-hover:text-violet-500 transition-colors duration-200"
                  >
                    support@freshcart.com
                  </Link>
                </div>
              </div>
              <div>|</div>
              <div className="flex gap-4 items-center">
                {isAuthenticated ? (
                  <>
                    <div className="flex gap-1 items-center group">
                      <IconUserFilled
                        stroke={2}
                        size={18}
                        className="text-sm inline-block text-gray-600 group-hover:text-violet-500 transition-colors duration-200"
                      />
                      <Link
                        href={"/profile"}
                        className="text-gray-700 text-sm font-medium group-hover:text-violet-500 transition-colors duration-200"
                      >
                        {userData?.name}
                      </Link>
                    </div>
                    <div className="flex gap-1 items-center group">
                      <IconLogout
                        stroke={2}
                        size={18}
                        className="text-sm inline-block text-gray-600 group-hover:text-violet-500 transition-colors duration-200"
                      />
                      <Link
                        href={"/signin"}
                        onClick={async () => {
                          await deleteToken();
                          dispatch(logOut());
                          dispatch(logOutCart());
                          dispatch(clearWish())
                        }}
                        className="text-gray-700 text-sm font-medium group-hover:text-violet-500 transition-colors duration-200"
                      >
                        Signout
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-1 items-center group">
                      <IconUserFilled
                        stroke={2}
                        size={18}
                        className="text-sm inline-block text-gray-600 group-hover:text-violet-500 transition-colors duration-200"
                      />
                      <Link
                        href={"/signin"}
                        className="text-gray-700 text-sm group-hover:text-violet-500 transition-colors duration-200"
                      >
                        Sign In
                      </Link>
                    </div>
                    <div className="flex gap-1 items-center group">
                      <IconUserPlus
                        stroke={2}
                        size={18}
                        className="text-sm inline-block text-gray-600 group-hover:text-violet-500 transition-colors duration-200"
                      />
                      <Link
                        href={"/signup"}
                        className="text-gray-700 text-sm group-hover:text-violet-500 transition-colors duration-200"
                      >
                        SignUp
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sticky top-0 right-0 left-0 h-17 bg-white shadow z-50">
        <div className="container py-4  h-full flex justify-between">
          <div className="h-full flex gap-12 items-center">
            <div className="logo h-full w-27">
              <Image
                onClick={() => {
                  route.push("/");
                }}
                src={logo}
                alt="zova-store"
                className="h-full cursor-pointer"
              />
            </div>
            <div className="search relative w-80 2xl:w-100 hidden xl:flex">
              <input
                type="text"
                placeholder="search for products, brands and more ..."
                className="w-full px-4 py-2 pr-12 rounded-full border border-gray-300 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
              <div className="absolute top-1/2 right-2 -translate-y-1/2 size-8 rounded-full bg-violet-500 flex items-center justify-center cursor-pointer">
                <IconSearch stroke={2} size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* *navigations */}
          <div className="h-full hidden xl:flex items-center gap-8">
            <ul className="flex gap-4">
              <li
                className={`${
                  pathName === "/" ? "text-violet-500 font-medium" : ""
                } hover:text-violet-500`}
              >
                <Link href={"/"}>Home</Link>
              </li>
              <li
                className={`${
                  pathName === "/shop" ? "text-violet-500" : ""
                } hover:text-violet-500`}
              >
                <Link href={"/shop"}>Shop</Link>
              </li>
              <li
                className={`${
                  pathName === "/categories"
                    ? "text-violet-500 font-medium"
                    : ""
                } hover:text-violet-500`}
              >
                <Link href={"/categories"}>Categories</Link>
              </li>
              <li
                className={`${
                  pathName === "/brands" ? "text-violet-500 font-medium" : ""
                } hover:text-violet-500`}
              >
                <Link href={"/brands"}>Brands</Link>
              </li>
            </ul>
          </div>

          <div className="h-full flex gap-6 items-center">
            <div className="hidden xl:block">
              <div className="flex h-full items-center gap-2">
                <div className="size-9 rounded-full bg-violet-200 flex justify-center items-center">
                  <IconHeadset
                    stroke={3}
                    size={16}
                    className="text-violet-800"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs text-gray-400 font-medium">
                    support
                  </span>
                  <h5 className="text-xs text-gray-900 font-semibold">
                    24/7 Help
                  </h5>
                </div>
                <div className="w-2 h-10 border-r-2 border-gray-300 px-2"></div>
              </div>
            </div>

            <Link href={"/wishlist"} className="relative">
              <IconHeart stroke={2} size={27} className="text-gray-500" />
              {data.data.length > 0 && (
                <div className="absolute -top-1/2 -right-1/2 border translate-y-1/3 -translate-x-1/3 size-5.5 text-xs font-medium rounded-full bg-red-500 text-white flex items-center justify-center">
                  {data.data.length}
                </div>
              )}
            </Link>
            <Link href={"/cart"} className="relative">
              <IconShoppingCartFilled
                stroke={2}
                size={27}
                className="text-gray-500"
              />
              {numOfCartItems > 0 && (
                <div className="absolute -top-1/2 -right-1/2 border translate-y-1/3 -translate-x-1/3 size-5.5 text-xs font-medium rounded-full bg-violet-500 text-white flex items-center justify-center">
                  {numOfCartItems}
                </div>
              )}
            </Link>
            {isAuthenticated ? (
              <div ref={userMenuRef} className="relative hidden md:block">
                <button
                  onClick={() => setUserMenu((v) => !v)}
                  className="flex size-9 items-center justify-center rounded-full` hover:bg-violet-200 transition-colors cursor-pointer"
                  aria-expanded={userMenu}
                  aria-haspopup="menu"
                >
                  <IconUser stroke={2} size={20} />
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-xl z-50">
                    <div className="bg-violet-600 px-4 py-4 text-white">
                      <p className="text-sm font-bold leading-none">
                        {userData?.name}
                      </p>
                      <p className="mt-1 text-xs text-violet-100 truncate">
                        {userData?.email ?? ""}
                      </p>
                      {userData?.role && (
                        <span className="mt-2 inline-flex rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold capitalize">
                          {userData.role}
                        </span>
                      )}
                    </div>

                    <div className="p-2">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                      >
                        <span className="flex size-8 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                          <IconUser size={16} />
                        </span>
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                      >
                        <span className="flex size-8 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                          <IconPackage size={16} />
                        </span>
                        My Orders
                      </Link>
                      <Link
                        href="/cart"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                      >
                        <span className="flex size-8 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                          <IconShoppingCartFilled size={16} />
                        </span>
                        Cart
                        {numOfCartItems > 0 && (
                          <span className="ml-auto rounded-full bg-violet-500 px-2 py-0.5 text-xs font-bold text-white">
                            {numOfCartItems}
                          </span>
                        )}
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                      >
                        <span className="flex size-8 items-center justify-center rounded-full bg-red-50 text-red-500">
                          <IconHeart size={16} />
                        </span>
                        Wishlist
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 p-2">
                      <button
                        onClick={async () => {
                          setUserMenu(false);
                          await deleteToken();
                          dispatch(logOut());
                          dispatch(logOutCart());
                          dispatch(clearWish());
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <span className="flex size-8 items-center justify-center rounded-full bg-red-50 text-red-600">
                          <IconLogout size={16} />
                        </span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn-primary hidden xl:flex gap-2 items-center cursor-pointer">
                <IconUser stroke={2} size={18} />
                <Link href={"/signin"}>SignIn</Link>
              </button>
            )}
            <button
              onClick={() => {
                setMenu(true);
              }}
              className="bg-violet-500 rounded-full size-10 text-white xl:hidden flex justify-center items-center cursor-pointer"
            >
              <IconMenu2Filled />
            </button>
          </div>
        </div>
      </div>

      {/* *mobile */}
      <div
        className={`fixed inset-0 z-50 xl:hidden transition-opacity duration-300 ${
          menu
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setMenu(false)}
          className="absolute inset-0 bg-black/50"
        />

        {/* Mobile Menu */}
        <div
          className={`absolute overflow-y-auto scrollbar-none top-0 right-0 bottom-0 w-80 bg-violet-50 p-4 ${menu ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}
        >
          <div className="flex flex-col gap-8 h-full">
            {/* Top */}
            <div className="top flex justify-between pb-4 border-b border-gray-200">
              <div className="logo w-25">
                <Image src={logo} alt="logo" />
              </div>

              <button
                onClick={() => setMenu(false)}
                className="cursor-pointer bg-gray-200 size-10 rounded-full flex justify-center items-center"
              >
                <IconX />
              </button>
            </div>

            {/* Search */}
            <div className="search relative w-full">
              <input
                type="text"
                placeholder="search for products, brands and more ..."
                className="w-full bg-gray-200/50 px-4 py-2 pr-12 rounded-xl border border-gray-300 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />

              <div className="absolute top-1/2 right-2 -translate-y-1/2 size-8 rounded-xl bg-violet-500 flex items-center justify-center cursor-pointer">
                <IconSearch stroke={2} size={16} className="text-white" />
              </div>
            </div>

            {/* Navigation */}
            <div className="py-4 px-6 border-y border-gray-200">
              <ul className="flex flex-col gap-6">
                <li className="hover:text-violet-500 text-lg">
                  <Link href="/" onClick={() => setMenu(false)}>
                    Home
                  </Link>
                </li>

                <li className="hover:text-violet-500 text-lg">
                  <Link href="/shop" onClick={() => setMenu(false)}>
                    Shop
                  </Link>
                </li>

                <li className="hover:text-violet-500 text-lg">
                  <Link href="/categories" onClick={() => setMenu(false)}>
                    Categories
                  </Link>
                </li>

                <li className="hover:text-violet-500 text-lg">
                  <Link href="/brands" onClick={() => setMenu(false)}>
                    Brands
                  </Link>
                </li>
              </ul>
            </div>

            {/* Wishlist / Cart */}
            <div className="px-6 space-y-4">
              <Link href={"/wishlist"} className="flex items-center gap-2.5">
                <div className="size-8 bg-red-100 rounded-full flex justify-center items-center text-red-500">
                  <IconHeart stroke={2} size={20} />
                </div>
                <span className="font-medium">Wishlist</span>
              </Link>

              <Link href={"/cart"} className="flex items-center gap-2.5">
                <div className="size-8 bg-violet-100 rounded-full flex justify-center items-center text-violet-500">
                  <IconShoppingCartFilled stroke={2} size={20} />
                </div>
                <span className="font-medium">Cart</span>
              </Link>

              {isAuthenticated && (
                <Link href={"/profile"} className="flex items-center gap-2.5">
                  <div className="size-8 bg-amber-100 rounded-full flex justify-center items-center text-amber-500">
                    <IconUser stroke={2} size={20} />
                  </div>
                  <span className="font-medium text-sm">{userData?.name}</span>
                </Link>
              )}
            </div>

            {/* Auth */}
            <div className="flex gap-4 py-6 border-y border-gray-200">
              {isAuthenticated ? (
                <Link
                  href={"/signin"}
                  onClick={async () => {
                    await deleteToken();
                    dispatch(logOut());
                    dispatch(logOutCart());
                    dispatch(clearWish());
                    setMenu(false);
                  }}
                  className="btn-primary flex-1 text-center inline-block"
                >
                  SignOut
                </Link>
              ) : (
                <>
                  <Link
                    href={"/signin"}
                    onClick={() => {
                      setMenu(false);
                    }}
                    className="btn-primary flex-1 text-center inline-block"
                  >
                    SignIn
                  </Link>
                  <Link
                    href={"/signup"}
                    onClick={() => {
                      setMenu(false);
                    }}
                    className="btn-secondary flex-1 text-center inline-block"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>

            {/* Help */}
            <div className="flex bg-gray-200/50 p-4 rounded-xl">
              <div className="flex gap-2">
                <div className="size-10 bg-violet-200 rounded-full flex justify-center items-center text-violet-700">
                  <IconHeadset />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium">Need Help?</span>
                  <span className="text-sm font-semibold">Contact Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
