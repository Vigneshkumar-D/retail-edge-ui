import { useRoutes } from "react-router-dom";
import Invoice from "./Invoice/invoice.js";
import Order from "./Order/order.js";

const SalesAndBilling = () => {
  const render = useRoutes([
    { path: "order/*", element: <Order /> },
    { path: "invoice/*", element: <Invoice /> },
  ]);
  return <>{render}</>;
};

export default SalesAndBilling;
