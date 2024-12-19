import { useRoutes } from "react-router-dom";
import OrderBill from "./orderBill";
import OrderHistory from "./orderHistory";

const Order = () => {
  const render = useRoutes([
    { path: "new", element: <OrderBill/> },
    { path: "update/:id", element: <OrderBill/> },
    { path: "history", element: <OrderHistory/> },
  ]);
  return <>{ render }</>;
};

export default Order;
