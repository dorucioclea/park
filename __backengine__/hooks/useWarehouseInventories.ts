import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["warehouse_inventory"];
export type Row = Table["Row"];
export type InsertWarehouseInventory = Table["Insert"];
export type UpdateWarehouseInventory = Table["Update"];

const useWarehouseInventories = () => {
  const [warehouseInventories, setWarehouseInventories] = useState<Row[]>([]);

  useEffect(() => {
    fetchWarehouseInventories();
  }, []);

  const fetchWarehouseInventories = async () => {
    try {
      const { data, error } = await supabase
        .from("warehouse_inventory")
        .select();
      if (error) {
        throw error;
      }
      setWarehouseInventories(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createWarehouseInventory = async (
    newData: InsertWarehouseInventory,
  ) => {
    const { data, error } = await supabase
      .from("warehouse_inventory")
      .insert([newData])
      .select();
    if (error) {
      throw error;
    }
    setWarehouseInventories([...warehouseInventories, data[0]]);
    return data[0];
  };

  const updateWarehouseInventory = async (
    id: Row["id"],
    updatedData: UpdateWarehouseInventory,
  ) => {
    const { data, error } = await supabase
      .from("warehouse_inventory")
      .update(updatedData)
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    setWarehouseInventories(
      warehouseInventories.map((warehouseInventory) =>
        warehouseInventory.id === id
          ? { ...warehouseInventory, ...data[0] }
          : warehouseInventory,
      ),
    );
    return data[0];
  };

  const deleteWarehouseInventory = async (
    id: Row["id"],
  ): Promise<number | null> => {
    const { error, count } = await supabase
      .from("warehouse_inventory")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) {
      throw error;
    }
    const filtered = warehouseInventories.filter(
      (warehouseInventory) => warehouseInventory.id !== id,
    );
    setWarehouseInventories(filtered);
    return count;
  };

  return {
    warehouseInventories,
    fetchWarehouseInventories,
    createWarehouseInventory,
    updateWarehouseInventory,
    deleteWarehouseInventory,
  };
};

export default useWarehouseInventories;
