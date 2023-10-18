"use client";

import useOrders from "../../hooks/useOrders";
import GetOrders from "./GetOrders";
import CreateOrders from "./CreateOrders";
import UpdateOrders from "./UpdateOrders";
import DeleteOrders from "./DeleteOrders";

export default function Orders() {
  const { orders, fetchOrders, createOrder, updateOrder, deleteOrder } =
    useOrders();

  return (
    <div>
      <GetOrders orders={orders} onFetch={fetchOrders} />
      <CreateOrders onCreate={createOrder} onFetch={fetchOrders} />
      <UpdateOrders onUpdate={updateOrder} onFetch={fetchOrders} />
      <DeleteOrders onDelete={deleteOrder} onFetch={fetchOrders} />
    </div>
  );
}
