"use client";

import useProducts from "../../hooks/useProducts";
import GetProducts from "./GetProducts";
import CreateProducts from "./CreateProducts";
import UpdateProducts from "./UpdateProducts";
import DeleteProducts from "./DeleteProducts";

export default function Products() {
  const {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  return (
    <div>
      <GetProducts products={products} onFetch={fetchProducts} />
      <CreateProducts onCreate={createProduct} onFetch={fetchProducts} />
      <UpdateProducts onUpdate={updateProduct} onFetch={fetchProducts} />
      <DeleteProducts onDelete={deleteProduct} onFetch={fetchProducts} />
    </div>
  );
}
