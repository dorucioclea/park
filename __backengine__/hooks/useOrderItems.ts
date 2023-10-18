import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["order_items"];
export type Row = Table["Row"];
export type InsertOrderItem = Table["Insert"];
export type UpdateOrderItem = Table["Update"];

const useOrderItems = () => {
  const [orderItems, setOrderItems] = useState<Row[]>([]);

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const fetchOrderItems = async () => {
    try {
      const { data, error } = await supabase.from("order_items").select();
      if (error) {
        throw error;
      }
      setOrderItems(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createOrderItem = async (newData: InsertOrderItem) => {
    const { data, error } = await supabase
      .from("order_items")
      .insert([newData])
      .select();
    if (error) {
      throw error;
    }
    setOrderItems([...orderItems, data[0]]);
    return data[0];
  };

  const updateOrderItem = async (
    id: Row["id"],
    updatedData: UpdateOrderItem,
  ) => {
    const { data, error } = await supabase
      .from("order_items")
      .update(updatedData)
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    setOrderItems(
      orderItems.map((orderItem) =>
        orderItem.id === id ? { ...orderItem, ...data[0] } : orderItem,
      ),
    );
    return data[0];
  };

  const deleteOrderItem = async (id: Row["id"]): Promise<number | null> => {
    const { error, count } = await supabase
      .from("order_items")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) {
      throw error;
    }
    const filtered = orderItems.filter((orderItem) => orderItem.id !== id);
    setOrderItems(filtered);
    return count;
  };

  return {
    orderItems,
    fetchOrderItems,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
  };
};

export default useOrderItems;
