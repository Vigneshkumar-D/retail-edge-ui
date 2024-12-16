import { useRoutes } from "react-router-dom";
import InvoiceBill from "./invoiceBill";
import InvoiceHistory from "./invoiceHistory";

const Invoice = () => {
  const render = useRoutes([
    { path: "new", element: <InvoiceBill/> },
    { path: "update/:id", element: <InvoiceBill/> },
    { path: "history", element: <InvoiceHistory/> },
  ]);
  return <>{ render }</>;
};

export default Invoice;
