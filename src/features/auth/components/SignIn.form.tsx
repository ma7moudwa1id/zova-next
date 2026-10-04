"use client";
import {
  IconArrowRight,
  IconBrandAppleFilled,
  IconBrandGoogleFilled,
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconLock,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { schema, signInValues } from "../schemas/SignIn";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInActions } from "../services/SignIn.Actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setToken } from "@/app/(auth)/auth/auth.Actions";
import { authActions } from "@/app/(auth)/slice/auth.Slice";
import { useDispatch } from "react-redux";
import { getCartItems } from "@/features/cart/services/Cart.Actions";
import { cartActions } from "@/features/cart/slices/CartSlice";
import { wishListActions } from "@/features/wishlist/slice/WishListSlice";
import { getWishList } from "@/features/wishlist/services/WishList.Actions";

export default function SignInform() {
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const { authStatus } = authActions;
  const { cartStatus } = cartActions;
  const { withStatus } = wishListActions;
  const dispatch = useDispatch();
  const passwordIcon = passwordIsShown
    ? { Icon: IconEye }
    : { Icon: IconEyeOff };
  const router = useRouter();
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<signInValues> = async (values) => {
    const response = await SignInActions(values);
    if (response.success) {
      toast.success(response.message);
      await setToken(response.data.token);
      const cartResponse = await getCartItems();
      const wishResponse = await getWishList();
      dispatch(
        authStatus({ isAuthenticated: true, userData: response.data.user }),
      );
      if (cartResponse.status === "success") {
        dispatch(cartStatus(cartResponse));
      }
      if (wishResponse.status === "success") {
        dispatch(withStatus(wishResponse));
      }
      reset();
      router.push("/");
    }

    if (!response.success) {
      if (response.fieldErrors) {
        for (const [key, message] of Object.entries(response.fieldErrors)) {
          setError(key as keyof signInValues, { message: message[0] });
        }
      }

      toast.error(response.message);
    }
  };

  return (
    <>
      <div className="p-10 w-full xl:w-[60%] space-y-8 bg-white">
        <div className=" space-y-2 text-center xl:text-start">
          <h3 className="text-black text-lg font-bold">
            <span className="text-violet-500">Zova</span> Store
          </h3>
          <h3 className="text-gray-700 text-[clamp(1.5rem,4vw,2.5rem)] font-semibold">
            Welcome Back
          </h3>
          <p className="">Sign in to your Zova account to continue shopping.</p>
        </div>
        <div>
          <form
            method="post"
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter Your Mail"
                  {...register("email")}
                  className="form-control"
                />
                <IconMail className="absolute top-1/2 -translate-y-1/2 left-2" />
              </div>
            </div>

            {errors.email && (
              <p className="text-sm text-red-400 font-semibold">
                *{errors.email.message}
              </p>
            )}

            {/* password */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Link
                  href={"/reset-password"}
                  className="text-violet-500 text-sm font-semibold"
                >
                  forget password ?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={`${passwordIsShown ? "text" : "password"}`}
                  placeholder="••••••••••••"
                  id="password"
                  {...register("password")}
                  className="form-control"
                />
                <IconLock className="absolute top-1/2 -translate-y-1/2 left-2" />
                <passwordIcon.Icon
                  onClick={() => {
                    setPasswordIsShown(!passwordIsShown);
                  }}
                  className="absolute text-gray-700/50 cursor-pointer top-1/2 -translate-y-1/2 right-2"
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-sm text-red-400 font-semibold">
                *{errors.password.message}
              </p>
            )}

            {/* createbtn */}
            <div className="grid mt-8">
              <button
                type="submit"
                className={`btn-primary py-4! rounded-xl! flex items-center gap-2 justify-center`}
              >
                {isSubmitting ? (
                  <IconLoader2 className="animate-spin text-white" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <IconArrowRight />
                  </>
                )}
              </button>
            </div>

            {/* or */}
            <div className=" flex justify-between items-center">
              <div className="w-[45%] h-0.5 bg-gray-300"></div>
              <span>or</span>
              <div className="w-[45%] h-0.5 bg-gray-300"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                target="_blank"
                href={"https://google.com"}
                className="google font-bold p-4 rounded-xl bg-violet-100 flex gap-2 justify-center items-center group hover:text-white hover:bg-violet-500 transition-colors duration-200"
              >
                <IconBrandGoogleFilled className="text-violet-500 group-hover:text-white" />{" "}
                Continue With Google
              </Link>
              <Link
                target="_blank"
                href={"https://www.icloud.com/"}
                className="apple font-bold p-4 rounded-xl bg-violet-100 flex gap-2 justify-center items-center group hover:text-white hover:bg-violet-500 transition-colors duration-200"
              >
                <IconBrandAppleFilled className="text-violet-500 group-hover:text-white" />{" "}
                Continue With Apple
              </Link>
            </div>

            {/* have account? */}
            <div className="text-center mt-5">
              <h3>
                Don't Hava An Account ?{" "}
                <Link href={"/signup"} className="text-violet-800 font-bold">
                  Create Your Account Now
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
