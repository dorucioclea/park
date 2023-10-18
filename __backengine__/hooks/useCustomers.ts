import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["customers"];
export type Row = Table["Row"];
export type InsertCustomer = Table["Insert"];
export type UpdateCustomer = Table["Update"];

const useCustomers = () => {
  const [customers, setCustomers] = useState<Row[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase.from("customers").select();
      if (error) {
        throw error;
      }
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createCustomer = async (newData: InsertCustomer) => {
    const { data, error } = await supabase
      .from("customers")
      .insert([newData])
      .select();
    if (error) {
      throw error;
    }
    setCustomers([...customers, data[0]]);
    return data[0];
  };

  const updateCustomer = async (id: Row["id"], updatedData: UpdateCustomer) => {
    const { data, error } = await supabase
      .from("customers")
      .update(updatedData)
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    setCustomers(
      customers.map((customer) =>
        customer.id === id ? { ...customer, ...data[0] } : customer,
      ),
    );
    return data[0];
  };

  const deleteCustomer = async (id: Row["id"]): Promise<number | null> => {
    const { error, count } = await supabase
      .from("customers")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) {
      throw error;
    }
    const filtered = customers.filter((customer) => customer.id !== id);
    setCustomers(filtered);
    return count;
  };

  return {
    customers,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomers;
