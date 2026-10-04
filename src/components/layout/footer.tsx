import { IconBrandFacebookFilled, IconBrandInstagram, IconBrandInstagramFilled, IconBrandTwitterFilled, IconBrandYoutubeFilled, IconCalendarFilled, IconCreditCard, IconMailFilled, IconMapPinFilled, IconPhoneFilled } from "@tabler/icons-react";
import logo from "../../assets/images/logo.png";
import Link from "next/link";
export default function Footer() {
  return (
    <>
      <section className="py-10 px-4 bg-violet-950 text-white">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="site-info space-y-8 col-span-full xl:col-span-4">
              <div className="logo bg-white p-2 rounded-xl w-32">
                <img src={logo.src} alt="logo" />
              </div>
              <div className="description">
                <p className="text-sm text-gray-300/80">
                  Zova-Store is your one-stop destination for quality products.
                  From fashion to electronics, we bring you the best brands at
                  competitive prices with a seamless shopping experience.
                </p>
              </div>
              <div className="contaact-info">
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-300/80"><IconPhoneFilled size={18} stroke={2} className="text-violet-300 "/>+1 (800) 123-4567</li>
                    <li className="flex items-center gap-2 text-sm text-gray-300/80"><IconMailFilled size={18} stroke={2} className="text-violet-300 "/>support@zovaStore.com</li>
                    <li className="flex items-center gap-2 text-sm text-gray-300/80"><IconMapPinFilled size={18} stroke={2} className="text-violet-300 "/>123 Commerce Street, New York, NY 10001</li>
                </ul>
              </div>

              <div className="social-icons flex gap-4 items-center text-gray-300/80">
                <div className="size-10 rounded-full flex justify-center items-center bg-violet-800/80 hover:bg-violet-500 hover:text-white cursor-pointer transition-colors duration-200">
                    <IconBrandFacebookFilled size={18}/>
                </div>
                <div className="size-10 rounded-full flex justify-center items-center bg-violet-800/80 hover:bg-violet-500 hover:text-white cursor-pointer transition-colors duration-200">
                    <IconBrandYoutubeFilled size={18}/>
                </div>
                <div className="size-10 rounded-full flex justify-center items-center bg-violet-800/80 hover:bg-violet-500 hover:text-white cursor-pointer transition-colors duration-200">
                    <IconBrandInstagram size={18}/>
                </div>
                <div className="size-10 rounded-full flex justify-center items-center bg-violet-800/80 hover:bg-violet-500 hover:text-white cursor-pointer transition-colors duration-200">
                    <IconBrandTwitterFilled size={18}/>
                </div>
              </div>
            </div>

            {/* *shop */}
            <div className="col-span-full md:col-span-6 xl:col-span-2 space-y-8">
                <h3 className="text-lg font-semibold">Shop</h3>
                <ul className="space-y-4 text-gray-300/80 text-sm">
                    <li><Link href={"/"} className="hover:text-violet-400 transition-colors duration-200">All Products</Link></li>
                    <li><Link href={"/categories"} className="hover:text-violet-400 transition-colors duration-200">Categories</Link></li>
                    <li><Link href={"/brands"} className="hover:text-violet-400 transition-colors duration-200">Brands</Link></li>
                    <li><Link href={"/electronics"} className="hover:text-violet-400 transition-colors duration-200">Electronics</Link></li>
                    <li><Link href={"/mens-fashion"} className="hover:text-violet-400 transition-colors duration-200">Mens fashion</Link></li>
                    <li><Link href={"womans-fashion"} className="hover:text-violet-400 transition-colors duration-200">Womans fashion</Link></li>
                </ul>
            </div>

            {/* *Account */}
            <div className="col-span-full md:col-span-6 xl:col-span-2 space-y-8">
                <h3 className="text-lg font-semibold">Account</h3>
                <ul className="space-y-4 text-gray-300/80 text-sm">
                    <li><Link href={"/"} className="hover:text-violet-400 transition-colors duration-200">MyAccount</Link></li>
                    <li><Link href={"/orders"} className="hover:text-violet-400 transition-colors duration-200">Order History</Link></li>
                    <li><Link href={"/"} className="hover:text-violet-400 transition-colors duration-200">Whislist</Link></li>
                    <li><Link href={"/cart"} className="hover:text-violet-400 transition-colors duration-200">Shopping Cart</Link></li>
                    <li><Link href={"/sigin"} className="hover:text-violet-400 transition-colors duration-200">Sign In</Link></li>
                    <li><Link href={"signup"} className="hover:text-violet-400 transition-colors duration-200">Create Account</Link></li>
                </ul>
            </div>

            {/* *support */}
            <div className="col-span-full md:col-span-6 xl:col-span-2 space-y-8">
                <h3 className="text-lg font-semibold">Support</h3>
                <ul className="space-y-4 text-gray-300/80 text-sm">
                    <li><Link href={"/"} className="hover:text-violet-400 transition-colors duration-200">Contact Us</Link></li>
                    <li><Link href={"/"} className="hover:text-violet-400 transition-colors duration-200">Help Center</Link></li>
                    <li><Link href={"/"} className="hover:text-violet-400 transition-colors duration-200">Shipping Info</Link></li>
                    <li><Link href={"/"} className="hover:text-violet-400 transition-colors duration-200">Returns & Refunds</Link></li>
                    <li><Link href={"/orders"} className="hover:text-violet-400 transition-colors duration-200">Track Order</Link></li>
                </ul>
            </div>


            {/* *legal */}
            <div className="col-span-full md:col-span-6 xl:col-span-2 space-y-8">
                <h3 className="text-lg font-semibold">Legal</h3>
                <ul className="space-y-4 text-gray-300/80 text-sm">
                    <li><Link href={"/privacy-policy"} className="hover:text-violet-400 transition-colors duration-200">Privacy Policy</Link></li>
                    <li><Link href={"/terms"} className="hover:text-violet-400 transition-colors duration-200">Terms Of Services</Link></li>
                    <li><Link href={"/privacy-policy"} className="hover:text-violet-400 transition-colors duration-200">Cookie Policy</Link></li>
                </ul>
            </div>
          </div>

          {/* *copyrights */}
          <div className="mt-10 pt-5 border-t border-gray-700 text-gray-300/80 flex justify-center gap-6 md:justify-between flex-wrap">
            <h4>© 2026 ZovaStore. All rights reserved.</h4>
            <div>
                <ul className="flex gap-4">
                    <li className="flex gap-2"><IconCreditCard/><span>Visa</span></li>
                    <li className="flex gap-2"><IconCreditCard/><span>Master Card</span></li>
                    <li className="flex gap-2"><IconCreditCard/><span>PayPal</span></li>
                </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
