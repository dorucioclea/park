"use client";

import useCustomers from "../../hooks/useCustomers";
import GetCustomers from "./GetCustomers";
import CreateCustomers from "./CreateCustomers";
import UpdateCustomers from "./UpdateCustomers";
import DeleteCustomers from "./DeleteCustomers";

export default function Customers() {
  const {
    customers,
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  return (
    <div>
      <GetCustomers customers={customers} onFetch={fetchCustomers} />
      <CreateCustomers onCreate={createCustomer} onFetch={fetchCustomers} />
      <UpdateCustomers onUpdate={updateCustomer} onFetch={fetchCustomers} />
      <DeleteCustomers onDelete={deleteCustomer} onFetch={fetchCustomers} />
    </div>
  );
}
