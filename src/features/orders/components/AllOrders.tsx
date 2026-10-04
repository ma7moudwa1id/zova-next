import { IconBox } from "@tabler/icons-react";
import { Order } from "../types/OrderTypes";
import OrderCard from "./OrderCard";

export default function AllOrders({
  allOrders,
}: {
  allOrders: Order[] | null;
}) {
  return (
    <div className="space-y-4">
      {/* Card 1 - reused component */}
      {allOrders && allOrders.map((order) => <OrderCard key={order._id} order={order}/>)}
      {!allOrders && <div className="flex items-center justify-center min-h-50 text-2xl">
        <IconBox size={35}/>
        No Orders Yet
        </div>}
    </div>
  );
}
