import { useRoutes } from "react-router-dom";
import Invoice from "./Invoice/invoice.js";
import OrderBill from "./Order/orderBill.js";
import Order from "./Order/order.js";

const SalesAndBilling = () => {
  const render = useRoutes([
    { path: "order", element: <Order /> },
    { path: "order/new", element: <OrderBill /> },
    { path: "order/update/:id", element: <OrderBill /> },
    { path: "invoice/*", element: <Invoice /> },
  ]);
  return <>{render}</>;
};

export default SalesAndBilling;
