import { IconArrowRight } from "@tabler/icons-react";
import { cateory } from "../services/services";
import Link from "next/link";

export default function CategoryCard({ category }: { category: cateory }) {
  const { _id, image, name } = category;
  return (
    <>
      <Link href={`/categories/${_id}`} className="card pb-2 md:p-4 flex flex-col items-center  gap-4 bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:duration-500 hover:transition-all cursor-pointer">
        <div className="image w-40 h-40 rounded-xl overflow-hidden">
          <img src={`${image}`} alt={name} className="size-full object-cover" />
        </div>
        <div className="info flex items-center">
          <h2 className="capitalize text-lg font-semibold text-center">{name}</h2>
        </div>
      </Link>
    </>
  );
}
