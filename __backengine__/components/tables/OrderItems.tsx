"use client";

import useOrderItems from "../../hooks/useOrderItems";
import GetOrderItems from "./GetOrderItems";
import CreateOrderItems from "./CreateOrderItems";
import UpdateOrderItems from "./UpdateOrderItems";
import DeleteOrderItems from "./DeleteOrderItems";

export default function OrderItems() {
  const {
    orderItems,
    fetchOrderItems,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
  } = useOrderItems();

  return (
    <div>
      <GetOrderItems orderItems={orderItems} onFetch={fetchOrderItems} />
      <CreateOrderItems onCreate={createOrderItem} onFetch={fetchOrderItems} />
      <UpdateOrderItems onUpdate={updateOrderItem} onFetch={fetchOrderItems} />
      <DeleteOrderItems onDelete={deleteOrderItem} onFetch={fetchOrderItems} />
    </div>
  );
}
