"use client";

import useWarehouseInventories from "../../hooks/useWarehouseInventories";
import GetWarehouseInventories from "./GetWarehouseInventories";
import CreateWarehouseInventories from "./CreateWarehouseInventories";
import UpdateWarehouseInventories from "./UpdateWarehouseInventories";
import DeleteWarehouseInventories from "./DeleteWarehouseInventories";

export default function WarehouseInventories() {
  const {
    warehouseInventories,
    fetchWarehouseInventories,
    createWarehouseInventory,
    updateWarehouseInventory,
    deleteWarehouseInventory,
  } = useWarehouseInventories();

  return (
    <div>
      <GetWarehouseInventories
        warehouseInventories={warehouseInventories}
        onFetch={fetchWarehouseInventories}
      />
      <CreateWarehouseInventories
        onCreate={createWarehouseInventory}
        onFetch={fetchWarehouseInventories}
      />
      <UpdateWarehouseInventories
        onUpdate={updateWarehouseInventory}
        onFetch={fetchWarehouseInventories}
      />
      <DeleteWarehouseInventories
        onDelete={deleteWarehouseInventory}
        onFetch={fetchWarehouseInventories}
      />
    </div>
  );
}
