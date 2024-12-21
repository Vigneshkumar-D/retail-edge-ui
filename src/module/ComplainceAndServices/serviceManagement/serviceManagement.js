import { useRoutes } from "react-router-dom";
import PaidService from "./PaidService/paidService";
import PaidServiceBill from "./PaidService/paidServiceBill";
import WarrentService from "./WarrantyService/warrantyService";
import WarrantyServiceBill from "./WarrantyService/warrantyServiceBill";
import ServiceInvoicePdf from "./PaidService/service_Invoice_pdf";

const ServiceManagement = () => {
  const render = useRoutes([
    {
      path: "paid-service",
      element: <PaidService />,
    },
    {
      path: "paid-service/new",
      element: <PaidServiceBill />,
    },
    {
      path: "paid-service/update/:id",
      element: <PaidServiceBill />,
    },
    {
      path: "warranty-service",
      element: <WarrentService />,
    },
    {
      path: "warranty-service/new",
      element: <WarrantyServiceBill />,
    },
    {
      path: "warranty-service/update/:id",
      element: <WarrantyServiceBill />,
    },
    {
      path: "/service/invoice",
      element: <ServiceInvoicePdf />,
      
    }
  ]);
  return <>{render}</>;
};

export default ServiceManagement;
