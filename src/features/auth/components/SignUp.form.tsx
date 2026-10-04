"use client";
import {
  IconArrowRight,
  IconBrandAppleFilled,
  IconBrandGoogleFilled,
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconLock,
  IconLockAccess,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { schema, signUpvalues } from "../schemas/SignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpActions } from "../services/SignUp.Actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignUpform() {
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const passwordIcon = passwordIsShown
    ? { Icon: IconEye }
    : { Icon: IconEyeOff };

  const [rePasswordIsShown, setrePasswordIsShown] = useState(false);
  const rePasswordIcon = rePasswordIsShown
    ? { Icon: IconEye }
    : { Icon: IconEyeOff };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<signUpvalues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<signUpvalues> = async (values) => {
    const response = await signUpActions(values);
    if (response.success) {
      toast.success(response.message);
      reset();
      router.push("/signin");
    }
    if (!response.success) {
      if (response.fieldErrors) {
        for (const [key, message] of Object.entries(response.fieldErrors)) {
          setError(key as keyof signUpvalues, { message: message[0] });
        }
      }
      toast.error(response.message);
    }
  };

  return (
    <>
      <div className="p-10 w-full xl:w-[60%] space-y-8 bg-white">
        <div className=" space-y-2 text-center xl:text-start">
          <h3 className="text-black text-[clamp(1.5rem,4vw,2.5rem)] font-bold">
            Create Your Account
          </h3>
          <p className="text-gray-700 text-sm md:text-base">
            Join Zova and discovering products you'll love
          </p>
        </div>
        <div>
          <form
            method="post"
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  id="name"
                  {...register("name")}
                  className="form-control"
                />
                <IconUser className="absolute top-1/2 -translate-y-1/2 left-2" />
              </div>
            </div>
            {errors.name && (
              <p className="text-sm text-red-400 font-semibold">
                *{errors.name.message}
              </p>
            )}
            {/* email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter Your Mail"
                  id="email"
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
              <label htmlFor="password" className="text-sm">
                Password
              </label>
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
            {/* confirm password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <input
                 type={`${rePasswordIsShown ? "text" : "password"}`}
                  placeholder="••••••••••••"
                  id="confirmPassword"
                  {...register("rePassword")}
                  className="form-control"
                />
                <IconLock className="absolute top-1/2 -translate-y-1/2 left-2" />
                <rePasswordIcon.Icon
                  onClick={() => {
                    setrePasswordIsShown(!rePasswordIsShown);
                  }}
                  className="absolute text-gray-700/50 cursor-pointer top-1/2 -translate-y-1/2 right-2"
                />
              </div>
            </div>
            {errors.rePassword && (
              <p className="text-sm text-red-400 font-semibold">
                *{errors.rePassword.message}
              </p>
            )}
            {/* phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+20 1152638469"
                  id="name"
                  {...register("phone")}
                  className="form-control"
                />
                <IconPhone className="absolute top-1/2 -translate-y-1/2 left-2" />
              </div>
            </div>
            {errors.phone && (
              <p className="text-sm text-red-400 font-semibold">
                *{errors.phone.message}
              </p>
            )}
            {/* terms */}
            <div className="flex text-sm gap-2 items-center mt-10">
              <input
                type="checkbox"
                id="terms"
                {...register("terms")}
                className="size-4 accent-violet-500"
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <Link href={"/terms"} className="text-violet-500 font-semibold">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href={"/privacy-policy"}
                  className="text-violet-500 font-semibold"
                >
                  Privacy Policy
                </Link>{" "}
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-400 font-semibold">
                *{errors.terms.message}
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
                Already Have An Account ?{" "}
                <Link href={"/signin"} className="text-violet-800 font-bold">
                  Sign In
                </Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
