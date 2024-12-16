import { useRoutes } from "react-router-dom";
import Product from "./product";
import StockTransaction from "./stockTransaction";

const ProductManagement = () => {
  const render = useRoutes([
    { path: "product", element: <Product /> },
    { path: "stock-transaction", element: <StockTransaction /> },
  ]);
  return <>{render}</>;
};

export default ProductManagement;
