import Link from "next/link";
import { brand } from "../services/Brands";

export default function BrandCard({ brand }: { brand: brand }) {
  const { _id, image, name } = brand;
  return (
    <>
      <Link href={`/brands/${_id}`} className="card p-4 flex flex-col items-center justify-center gap-4 bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:duration-500 hover:transition-all cursor-pointer">
        <div className="image w-full h-40 rounded-xl overflow-hidden">
          <img src={`${image}`} alt={name} className="size-full object-contain" />
        </div>
        <div className="info flex items-center">
          <h2 className="capitalize text-violet-800 text-lg font-semibold text-center">{name}</h2>
        </div>
      </Link>
    </>
  );
}
