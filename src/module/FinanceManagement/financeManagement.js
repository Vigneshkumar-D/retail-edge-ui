import { useRoutes } from "react-router-dom";
import Accounts from "./accounts";
import EMI from "./emi";
import Expence from "./expence/expence";
import Settlement from "./settlement";

const FinanceManagement = () => {
  const render = useRoutes([
    { path: "accounts", element: <Accounts /> },
    { path: "emi", element: <EMI /> },
    { path: "expence", element: <Expence /> },
    { path: "settlement", element: <Settlement /> },
  ]);
  return <>{render}</>;
};

export default FinanceManagement;
