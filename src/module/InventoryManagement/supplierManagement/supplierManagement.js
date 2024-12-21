import { useRoutes } from "react-router-dom";
import Dashboard from "./dashboard";
import Suppiler from "./supplier";
import Payment from "./payment";
import PurchaseOrder from "./purchaseOrder/purchaseOrders";

const SupplierManagement = () => {
  const render = useRoutes([
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "supplier",
      element: <Suppiler />,
    },
    {
      path: "purchase-orders",
      element: <PurchaseOrder />,
    },
    {
      path: "payments",
      element: <Payment />,
    },
  ]);
  return <>{render}</>;
};

export default SupplierManagement;