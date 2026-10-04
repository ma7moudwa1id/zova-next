import { IconHeadset, IconRotate, IconShieldHalfFilled, IconTruckFilled } from "@tabler/icons-react";

export default function Prons() {
  return (
    <>
      <section className="py-8 bg-violet-100">
        <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="meza bg-white p-4 rounded-xl shadow hover:shadow-md hover:transition-shadow hover:duration-300">
                    <div className="flex items-center gap-4">
                        <div className="icon size-12 rounded-full flex justify-center items-center bg-red-800 text-white">
                            <IconTruckFilled/>
                        </div>
                        <div>
                            <h6 className="text-sm font-semibold">Free Shipping</h6>
                            <span className="text-xs font-medium">On orders over 500 EGP</span>
                        </div>
                    </div>
                </div>

                <div className="meza bg-white p-4 rounded-xl shadow hover:shadow-md hover:transition-shadow hover:duration-300">
                    <div className="flex items-center gap-4">
                        <div className="icon size-12 rounded-full flex justify-center items-center bg-green-700 text-white">
                            <IconShieldHalfFilled/>
                        </div>
                        <div className="*:m-0">
                            <h6 className="text-sm font-semibold">Secure Payment</h6>
                            <span className="text-xs font-medium">100% secure transactions</span>
                        </div>
                    </div>
                </div>

                <div className="meza bg-white p-4 rounded-xl shadow hover:shadow-md hover:transition-shadow hover:duration-300">
                    <div className="flex items-center gap-4">
                        <div className="icon size-12 rounded-full flex justify-center items-center bg-gray-200 text-orange-500">
                            <IconRotate/>
                        </div>
                        <div className="*:m-0">
                            <h6 className="text-sm font-semibold">Easy Returns</h6>
                            <span className="text-xs font-medium">14-day return policy</span>
                        </div>
                    </div>
                </div>

                <div className="meza bg-white p-4 rounded-xl shadow hover:shadow-md hover:transition-shadow hover:duration-300">
                    <div className="flex items-center gap-4">
                        <div className="icon size-12 rounded-full flex justify-center items-center bg-violet-200 text-violet-800">
                            <IconHeadset/>
                        </div>
                        <div className="*:m-0">
                            <h6 className="text-sm font-semibold">24/7 Support</h6>
                            <span className="text-xs font-medium">Dedicated support team</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
