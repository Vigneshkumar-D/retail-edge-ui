import { useRoutes } from "react-router-dom";
import ProductManagement from "./productManagement/productManagement";
import SupplierManagement from "./supplierManagement/supplierManagement";

const InventoryManagement = () => {
  const render = useRoutes([
    { path: "procuct-management/*", element: <ProductManagement /> },
    { path: "supplier-management/*", element: <SupplierManagement /> },
  ]);
  return <>{render}</>;
};

export default InventoryManagement;
