import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["orders"];
export type Row = Table["Row"];
export type InsertOrder = Table["Insert"];
export type UpdateOrder = Table["Update"];

const useOrders = () => {
  const [orders, setOrders] = useState<Row[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("orders").select();
      if (error) {
        throw error;
      }
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createOrder = async (newData: InsertOrder) => {
    const { data, error } = await supabase
      .from("orders")
      .insert([newData])
      .select();
    if (error) {
      throw error;
    }
    setOrders([...orders, data[0]]);
    return data[0];
  };

  const updateOrder = async (id: Row["id"], updatedData: UpdateOrder) => {
    const { data, error } = await supabase
      .from("orders")
      .update(updatedData)
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, ...data[0] } : order,
      ),
    );
    return data[0];
  };

  const deleteOrder = async (id: Row["id"]): Promise<number | null> => {
    const { error, count } = await supabase
      .from("orders")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) {
      throw error;
    }
    const filtered = orders.filter((order) => order.id !== id);
    setOrders(filtered);
    return count;
  };

  return { orders, fetchOrders, createOrder, updateOrder, deleteOrder };
};

export default useOrders;
