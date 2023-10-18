import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Database } from "../types";

type Table = Database["public"]["Tables"]["products"];
export type Row = Table["Row"];
export type InsertProduct = Table["Insert"];
export type UpdateProduct = Table["Update"];

const useProducts = () => {
  const [products, setProducts] = useState<Row[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select();
      if (error) {
        throw error;
      }
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const createProduct = async (newData: InsertProduct) => {
    const { data, error } = await supabase
      .from("products")
      .insert([newData])
      .select();
    if (error) {
      throw error;
    }
    setProducts([...products, data[0]]);
    return data[0];
  };

  const updateProduct = async (id: Row["id"], updatedData: UpdateProduct) => {
    const { data, error } = await supabase
      .from("products")
      .update(updatedData)
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...data[0] } : product,
      ),
    );
    return data[0];
  };

  const deleteProduct = async (id: Row["id"]): Promise<number | null> => {
    const { error, count } = await supabase
      .from("products")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) {
      throw error;
    }
    const filtered = products.filter((product) => product.id !== id);
    setProducts(filtered);
    return count;
  };

  return {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
